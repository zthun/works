import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { IZDatabase, ZDatabaseMemory } from '@zthun/dal';
import { ZUserBuilder } from './user-builder.class';
import { IZUser } from './user.interface';
import { ZUsersController } from './users.controller';

describe('ZUsersController', () => {
  let dal: IZDatabase;
  let userSuperman: IZUser;
  let userBatman: IZUser;
  let userFlash: IZUser;
  let userWonderWoman: IZUser;

  beforeEach(() => {
    userSuperman = ZUserBuilder.empty().email('superman').password('superman-secret').user();
    userBatman = ZUserBuilder.empty().email('batman').password('batman-secret').user();
    userFlash = ZUserBuilder.empty().email('flash').password('flash-secret').user();
    userWonderWoman = ZUserBuilder.empty().email('wonder-woman').password('wonder-woman-secret').user();
    dal = ZDatabaseMemory.connect('auth');
  });

  afterEach(async () => {
    await ZDatabaseMemory.kill();
  });

  function createTestTarget() {
    return new ZUsersController(dal);
  }

  describe('List', () => {
    it('returns all users.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.create<IZUser>(ZUsersController.Collection, [userSuperman, userBatman, userFlash, userWonderWoman]).run();
      const expected = [userSuperman, userBatman, userFlash, userWonderWoman].map((usr) => usr.email);
      // Act
      const actual = await target.list();
      // Assert
      expect(actual.map((usr) => usr.email)).toEqual(expected);
    });
  });

  describe('Create', () => {
    it('creates the user.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = userSuperman.email;
      // Act
      const user = await target.create(userSuperman);
      const actual = await target.read({ id: user._id });
      // Assert
      expect(actual.email).toEqual(expected);
    });

    it('secures the password.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(userSuperman);
      const list = await dal.read<IZUser>(ZUsersController.Collection).filter({ _id: created._id }).run();
      const actual = list[0];
      const expected = ZUserBuilder.empty().merge(actual).password(userSuperman.password).encode().user();
      // Assert
      expect(actual.password).toEqual(expected.password);
    });

    it('throws a ConflictException if a user with an equivalent email already exists.', async () => {
      // Arrange
      const target = createTestTarget();
      await target.create(userSuperman);
      // Act
      // Assert
      await expect(target.create(userSuperman)).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a BadRequestException if the user has no email.', async () => {
      // Arrange
      const target = createTestTarget();
      delete userSuperman.email;
      // Act
      // Assert
      await expect(target.create(userSuperman)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws a BadRequestException if the user has no password.', async () => {
      // Arrange
      const target = createTestTarget();
      delete userSuperman.password;
      // Act
      // Assert
      await expect(target.create(userSuperman)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Read', () => {
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
      let added = await dal.create<IZUser>(ZUsersController.Collection, [userSuperman]).run();
      userSuperman = added[0];
      added = await dal.create<IZUser>(ZUsersController.Collection, [userBatman]).run();
      userBatman = added[0];
    });

    it('updates the user email.', async () => {
      // Arrange
      const target = createTestTarget();
      const userSupermanUpdate: Partial<IZUser> = { email: 'super-man-2' };
      // Act
      const updated = await target.update({ id: userSuperman._id }, userSupermanUpdate);
      // Assert
      expect(updated._id).toEqual(userSuperman._id);
      expect(updated.email).toEqual(userSupermanUpdate.email);
    });

    it('does not update the email if the email is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      const userSupermanUpdate: Partial<IZUser> = { password: 'super-password' };
      // Act
      const updated = await target.update({ id: userSuperman._id }, userSupermanUpdate);
      // Assert
      expect(updated.email).toEqual(userSuperman.email);
    });

    it('updates the password.', async () => {
      // Arrange
      const target = createTestTarget();
      const userSupermanUpdate: Partial<IZUser> = { password: 'super-man-secret-2' };
      // Act
      await target.update({ id: userSuperman._id }, userSupermanUpdate);
      const list = await dal.read<IZUser>(ZUsersController.Collection).filter({ _id: userSuperman._id }).run();
      const actual = list[0];
      const expected = ZUserBuilder.empty().merge(actual).password(userSupermanUpdate.password).encode().user();
      // Assert
      expect(actual.password).toEqual(expected.password);
    });

    it('does not update the password if it is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      const userSupermanUpdate: Partial<IZUser> = {};
      // Act
      const updated = await target.update({ id: userSuperman._id }, userSupermanUpdate);
      const list = await dal.read<IZUser>(ZUsersController.Collection).filter({ _id: userSuperman._id }).run();
      const actual = list[0];
      // Assert
      expect(actual.password).toEqual(userSuperman.password);
    });

    it('throws a ConflictException if another user has the email already.', async () => {
      // Arrange
      const target = createTestTarget();
      const user = ZUserBuilder.empty().email(userBatman.email).user();
      // Act
      // Assert
      await expect(target.update({ id: userSuperman._id }, user)).rejects.toBeInstanceOf(ConflictException);
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
    it('deletes the user.', async () => {
      // Arrange
      const target = createTestTarget();
      const batman = await target.create(userBatman);
      // Act
      await target.remove({ id: batman._id });
      // Assert
      await expect(target.read({ id: batman._id })).rejects.toBeInstanceOf(NotFoundException);
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
