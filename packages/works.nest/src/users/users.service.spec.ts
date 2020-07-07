import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { IZLogin, IZProfile, IZUser, ZLoginBuilder, ZUserBuilder } from '@zthun/works.core';
import { compare, hash } from 'bcryptjs';
import { ZUsersCollections } from './users.collections';
import { ZUsersService } from './users.service';
import { v4 } from 'uuid';

describe('ZUsersRepositoryController', () => {
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

    const pwdA = await hash(loginA.password, ZUsersService.BcryptRounds);
    const pwdB = await hash(loginB.password, ZUsersService.BcryptRounds);

    userA = new ZUserBuilder().email(loginA.email).password(pwdA).build();
    userB = new ZUserBuilder().email(loginB.email).password(pwdB).build();
  });

  afterEach(async () => {
    await dal.delete(ZUsersCollections.Users).run();
  });

  function createTestTarget() {
    return new ZUsersService(dal);
  }

  describe('List', () => {
    beforeEach(async () => {
      [userA, userB] = await dal.create(ZUsersCollections.Users, [userA, userB]).run();
    });

    it('returns all users.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = [userA, userB];
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Create', () => {
    beforeEach(async () => {
      [userB] = await dal.create(ZUsersCollections.Users, [userB]).run();
    });

    it('creates a user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual._id).toBeTruthy();
      expect(actual.email).toEqual(loginA.email);
    });

    it('creates the super user if the new user is the first in the system.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.delete(ZUsersCollections.Users).run();
      // Act
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.super).toBeTruthy();
    });

    it('always sets the super user to active without having to have them activate their account.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.delete(ZUsersCollections.Users).run();
      // Act
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.activator).toBeFalsy();
    });

    it('creates a normal user if there is already a super user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.super).toBeFalsy();
    });

    it('generates a one time password for the user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: created._id }).run();
      // Assert
      expect(actual.activator).toBeTruthy();
    });

    it('secures the password.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(loginA);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: created._id }).run();
      const same = await compare(loginA.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
    });
  });

  describe('Find', () => {
    beforeEach(async () => {
      [userA, userB] = await dal.create(ZUsersCollections.Users, [userA, userB]).run();
    });

    it('finds a user by id.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.findById(userA._id);
      // Assert
      expect(actual).toEqual(userA);
    });

    it('reads a user by email.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.findByEmail(userA.email);
      // Assert
      expect(actual).toEqual(userA);
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      [userA, userB] = await dal
        .create<IZUser>(ZUsersCollections.Users, [userA, userB])
        .run();
    });

    it('updates the user email.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = 'super-user';
      const profile: IZProfile = { email: expected };
      // Act
      await target.update(userA._id, profile);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(actual.email).toEqual(expected);
    });

    it('updates the password.', async () => {
      // Arrange
      const target = createTestTarget();
      const profile: IZProfile = { password: 'super-password', confirm: 'super-password' };
      // Act
      await target.update(userA._id, profile);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: userA._id }).run();
      const same = await compare(profile.password, actual.password);
      // Assert
      expect(same).toBeTruthy();
    });

    it('updates the display.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = 'Superman';
      const profile: IZProfile = { display: expected };
      // Act
      await target.update(userA._id, profile);
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(actual.display).toEqual(expected);
    });

    it('does not update anything if nothing is set.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update(userA._id, {});
      const [actual] = await dal.read<IZUser>(ZUsersCollections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(actual.password).toEqual(userA.password);
    });

    it('activates the user.', async () => {
      // Arrange
      let userC = new ZUserBuilder().email('c@gmail.com').password('whatever').inactive(v4()).build();
      [userC] = await dal
        .create<IZUser>(ZUsersCollections.Users, [userC])
        .run();
      const target = createTestTarget();
      // Act
      const actual = await target.activate(userC);
      // Assert
      expect(actual.activator).toBeFalsy();
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      [userA, userB] = await dal.create(ZUsersCollections.Users, [userA, userB]).run();
    });

    it('deletes the user.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove(userA._id);
      const blobs = await dal.read(ZUsersCollections.Users).filter({ _id: userA._id }).run();
      // Assert
      expect(blobs.length).toEqual(0);
    });
  });

  describe('Authenticate', () => {
    beforeEach(async () => {
      [userA] = await dal.create(ZUsersCollections.Users, [userA]).run();
    });

    it('returns false if no such user exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.compare(loginB);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns false if the passwords do not match.', async () => {
      // Arrange
      const target = createTestTarget();
      loginA.password = 'wrong-password';
      // Act
      const actual = await target.compare(loginA);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('returns true if the email and password match.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.compare(loginA);
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
