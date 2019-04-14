import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { IZDatabase, ZDatabaseMemory } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { zhash, zhashcmp } from '../common/hash.function';
import { ZLoginBuilder } from './login-builder.class';
import { IZLogin } from './login.interface';
import { ZUserBuilder } from './user-builder.class';
import { IZUser } from './user.interface';
import { ZUsersController } from './users.controller';

describe('ZUsersController', () => {
  let dal: IZDatabase;
  let userA: IZUser;
  let userB: IZUser;
  let loginA: IZLogin;
  let loginB: IZLogin;

  beforeEach(async () => {
    loginA = new ZLoginBuilder().email('a@gmail.com').password('super-secret-a').autoConfirm().login();
    loginB = new ZLoginBuilder().email('b@yahoo.com').password('super-secret-b').autoConfirm().login();

    const pwdA = await zhash(loginA.password);
    const pwdB = await zhash(loginB.password);

    userA = new ZUserBuilder().email(loginA.email).password(pwdA).user();
    userB = new ZUserBuilder().email(loginB.email).password(pwdB).user();

    dal = ZDatabaseMemory.connect('auth');
  });

  afterEach(async () => {
    await ZDatabaseMemory.kill();
  });

  function createTestTarget() {
    return new ZUsersController(dal);
  }

  describe('List', () => {
    beforeEach(async () => {
      const blobs = await dal.create(Collections.Users, [userA, userB]).run();
      userA = blobs[0];
      userB = blobs[1];
    });

    it('returns all users.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = [userA, userB].map((usr) => new ZUserBuilder().copy(usr).redact().user());
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Create', () => {
    beforeEach(async () => {
      const blobs = await dal.create(Collections.Users, [userB]).run();
      userB = blobs[0];
    });

    it('creates the user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      const actualBlobs = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      const actual = actualBlobs[0];
      // Assert
      expect(actual._id).toBeTruthy();
      expect(actual.email).toEqual(loginA.email);
    });

    it('returns a redacted user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      // Assert
      expect(created.password).toBeFalsy();
    });

    it('secures the password.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      const actualBlobs = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      const actual = actualBlobs[0];
      const same = await zhashcmp(loginA.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
    });

    it('throws a ConflictException if a user with an equivalent email already exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.create(loginB)).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a BadRequestException if the user has no email.', async () => {
      // Arrange
      const target = createTestTarget();
      delete loginA.email;
      // Act
      // Assert
      await expect(target.create(loginA)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws a BadRequestException if the user has no password.', async () => {
      // Arrange
      const target = createTestTarget();
      delete loginA.password;
      // Act
      // Assert
      await expect(target.create(loginA)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws a BadRequestException if the user has a password that is not confirmed.', async () => {
      // Arrange
      const target = createTestTarget();
      loginA.confirm = '';
      // Act
      // Assert
      await expect(target.create(loginA)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Read', () => {
    beforeEach(async () => {
      const blobs = await dal.create(Collections.Users, [userA, userB]).run();
      userA = blobs[0];
      userB = blobs[1];
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
      const blobs = await dal.create<IZUser>(Collections.Users, [userA, userB]).run();
      userA = blobs[0];
      userB = blobs[1];
    });

    it('updates the user email.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = 'super-user';
      const template: Partial<IZLogin> = { email: expected };
      // Act
      await target.update({ id: userA._id }, template);
      const blobs = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      const actual = blobs[0];
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
      const blobs = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      const actual = blobs[0];
      const same = await zhashcmp(template.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
    });

    it('does not update the password if it is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update({ id: userA._id }, {});
      const list = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      const actual = list[0];
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

    it('throws a BadRequestException if the confirm is set but the password is not.', async () => {
      // Arrange
      const target = createTestTarget();
      const template = { confirm: 'super-password' };
      // Act
      // Assert
      await expect(target.update({ id: userA._id }, template)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws a BadRequestException if the password is set but the confirm is not.', async () => {
      // Arrange
      const target = createTestTarget();
      const template = { password: 'super-password' };
      // Act
      // Assert
      await expect(target.update({ id: userA._id }, template)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws a BadRequestException if the password does not match the confirm.', async () => {
      // Arrange
      const target = createTestTarget();
      const template = { password: 'super-password', confirm: 'super' };
      // Act
      // Assert
      await expect(target.update({ id: userA._id }, template)).rejects.toBeInstanceOf(BadRequestException);
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
      const blobs = await dal.create(Collections.Users, [userA]).run();
      userA = blobs[0];
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

    it('throws a NotFoundException if there is no id.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.remove({ id: 'n/a' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
