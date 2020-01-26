import { ConflictException, NotFoundException } from '@nestjs/common';
import { IZLogin, IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { compare, hash } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { v4 } from 'uuid';
import { ZAuthService } from '../auth/auth.service';
import { Collections } from '../common/collections.enum';
import { BcryptRounds } from '../common/crypt.constants';
import { ZGroupUserBuilder } from '../common/group-user-builder.class';
import { ZUserCreateDto } from './user-create.dto';
import { ZUsersController } from './users.controller';

describe('ZUsersController', () => {
  let dal: IZDatabase;
  let userA: IZUser;
  let userB: IZUser;
  let loginA: IZLogin;
  let loginB: IZLogin;

  beforeAll(() => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('user-controller-test').build());
  });

  beforeEach(async () => {
    loginA = new ZLoginBuilder().email('a@gmail.com').password('super-secret-a').autoConfirm().build();
    loginB = new ZLoginBuilder().email('b@yahoo.com').password('super-secret-b').autoConfirm().build();

    const pwdA = await hash(loginA.password, BcryptRounds);
    const pwdB = await hash(loginB.password, BcryptRounds);

    userA = new ZUserBuilder().email(loginA.email).password(pwdA).build();
    userB = new ZUserBuilder().email(loginB.email).password(pwdB).build();
  });

  afterEach(async () => {
    await dal.delete(Collections.GroupsUsers).run();
    await dal.delete(Collections.Users).run();
  });

  function createTestTarget() {
    return new ZUsersController(dal);
  }

  describe('List', () => {
    beforeEach(async () => {
      [userA, userB] = await dal.create(Collections.Users, [userA, userB]).run();
    });

    it('returns all users.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = [userA, userB].map((usr) => new ZUserBuilder().copy(usr).redact().build());
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Create', () => {
    beforeEach(async () => {
      [userB] = await dal.create(Collections.Users, [userB]).run();
    });

    it('creates a user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(plainToClass(ZUserCreateDto, loginA));
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual._id).toBeTruthy();
      expect(actual.email).toEqual(loginA.email);
    });

    it('creates the super user if the new user is the first in the system.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.delete(Collections.Users).run();
      // Act
      const created = await target.create(plainToClass(ZUserCreateDto, loginA));
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.super).toBeTruthy();
    });

    it('adds the super user to the admin group.', async () => {
      // Arrange
      const target = createTestTarget();
      const admin = ZAuthService.constructSystemGroupAdministrators();
      await dal.delete(Collections.Users).run();
      // Act
      const created = await target.create(plainToClass(ZUserCreateDto, loginA));
      const expected = new ZGroupUserBuilder().group(admin).user(created).redact().build();
      const [actual] = await dal.read<IZUser>(Collections.GroupsUsers).filter({ _id: expected._id }).run();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('creates a normal user if there is already a super user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(plainToClass(ZUserCreateDto, loginA));
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.super).toBeFalsy();
    });

    it('returns a redacted user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(plainToClass(ZUserCreateDto, loginA));
      // Assert
      expect(created.password).toBeFalsy();
    });

    it('secures the password.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(plainToClass(ZUserCreateDto, loginA));
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      const same = await compare(loginA.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
    });

    it('throws a ConflictException if a user with an equivalent email already exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.create(plainToClass(ZUserCreateDto, loginB))).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('Read', () => {
    beforeEach(async () => {
      [userA, userB] = await dal.create(Collections.Users, [userA, userB]).run();
    });

    it('reads a redacted user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read({ id: userA._id });
      // Assert
      expect(actual._id).toEqual(userA._id);
      expect(actual.email).toEqual(userA.email);
      expect(actual.password).toBeFalsy();
    });

    it('throws a NotFoundException if no user exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.read({ id: '-1' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      [userA, userB] = await dal.create<IZUser>(Collections.Users, [userA, userB]).run();
    });

    it('updates the user email.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = 'super-user';
      const template: Partial<IZLogin> = { email: expected };
      // Act
      await target.update({ id: userA._id }, template);
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(actual.email).toEqual(expected);
    });

    it('does not update the email if the email is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      const template: Partial<IZLogin> = { password: 'super-password', confirm: 'super-password' };
      // Act
      const updated = await target.update({ id: userA._id }, template);
      // Assert
      expect(updated.email).toEqual(userA.email);
    });

    it('updates the password.', async () => {
      // Arrange
      const target = createTestTarget();
      const template: Partial<IZLogin> = { password: 'super-password', confirm: 'super-password' };
      // Act
      await target.update({ id: userA._id }, template);
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      const same = await compare(template.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
    });

    it('does not update the password if it is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update({ id: userA._id }, {});
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(actual.password).toEqual(userA.password);
    });

    it('throws a ConflictException if another user has the email already.', async () => {
      // Arrange
      const target = createTestTarget();
      const template: Partial<IZLogin> = { email: userB.email };
      // Act
      // Assert
      await expect(target.update({ id: userA._id }, template)).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a NotFoundException if there is no id to update.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.update({ id: 'not-found' }, {})).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      [userA, userB] = await dal.create(Collections.Users, [userA, userB]).run();
    });

    it('deletes the user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove({ id: userA._id });
      const blobs = await dal.read(Collections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(blobs.length).toEqual(0);
    });

    it('deletes the user from all groups.', async () => {
      // Arrange
      const target = createTestTarget();
      let assignmentA = new ZGroupUserBuilder().groupId(v4()).user(userA).redact().build();
      let assignmentB = new ZGroupUserBuilder().groupId(v4()).user(userA).redact().build();
      let assignmentC = new ZGroupUserBuilder().groupId(assignmentB.groupId).user(userB).redact().build();
      [assignmentA, assignmentB, assignmentC] = await dal.create(Collections.GroupsUsers, [assignmentA, assignmentB, assignmentC]).run();
      // Act
      await target.remove({ id: userA._id });
      const assignments = await dal.read(Collections.GroupsUsers).run();
      // Assert
      expect(assignments.length).toEqual(1);
    });

    it('throws a NotFoundException if there is no id.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.remove({ id: 'n/a' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
