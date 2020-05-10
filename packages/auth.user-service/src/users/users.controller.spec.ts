import { IZLogin, IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { compare, hash } from 'bcryptjs';
import { Collections } from '../common/collections.enum';
import { BcryptRounds } from '../common/crypt.constants';
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
      const created = await target.create(loginA);
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
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.super).toBeTruthy();
    });

    it('creates a normal user if there is already a super user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.super).toBeFalsy();
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
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: created._id }).run();
      const same = await compare(loginA.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
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
  });

  describe('Update', () => {
    beforeEach(async () => {
      [userA, userB] = await dal
        .create<IZUser>(Collections.Users, [userA, userB])
        .run();
    });

    it('updates the user email.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = 'super-user';
      const login: Partial<IZLogin> = { email: expected };
      // Act
      await target.update({ id: userA._id, login });
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(actual.email).toEqual(expected);
    });

    it('does not update the email if the email is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      const login: Partial<IZLogin> = { password: 'super-password', confirm: 'super-password' };
      // Act
      const updated = await target.update({ id: userA._id, login });
      // Assert
      expect(updated.email).toEqual(userA.email);
    });

    it('updates the password.', async () => {
      // Arrange
      const target = createTestTarget();
      const login: Partial<IZLogin> = { password: 'super-password', confirm: 'super-password' };
      // Act
      await target.update({ id: userA._id, login });
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      const same = await compare(login.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
    });

    it('does not update the password if it is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update({ id: userA._id, login: {} });
      const [actual] = await dal.read<IZUser>(Collections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(actual.password).toEqual(userA.password);
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
  });
});
