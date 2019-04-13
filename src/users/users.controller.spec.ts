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
    userSuperman = ZUserBuilder.empty().name('superman').password('superman-secret').user();
    userBatman = ZUserBuilder.empty().name('batman').password('batman-secret').user();
    userFlash = ZUserBuilder.empty().name('flash').password('flash-secret').user();
    userWonderWoman = ZUserBuilder.empty().name('wonder-woman').password('wonder-woman-secret').user();
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
      const expected = [userSuperman, userBatman, userFlash, userWonderWoman].map((usr) => usr.name);
      // Act
      const actual = await target.list();
      // Assert
      expect(actual.map((usr) => usr.name)).toEqual(expected);
    });
  });

  describe('Create', () => {
    it('creates the user.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = userSuperman.name;
      // Act
      const user = await target.create(userSuperman);
      const actual = await target.read({ id: user._id });
      // Assert
      expect(actual.name).toEqual(expected);
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

    it('throws a ConflictException if a user with an equivalent name already exists.', async () => {
      // Arrange
      const target = createTestTarget();
      await target.create(userSuperman);
      // Act
      // Assert
      await expect(target.create(userSuperman)).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a BadRequestException if the user has no name.', async () => {
      // Arrange
      const target = createTestTarget();
      delete userSuperman.name;
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

    it('updates the user name.', async () => {
      // Arrange
      const target = createTestTarget();
      const userSupermanUpdate: Partial<IZUser> = { name: 'super-man-2' };
      // Act
      const updated = await target.update({ id: userSuperman._id }, userSupermanUpdate);
      // Assert
      expect(updated._id).toEqual(userSuperman._id);
      expect(updated.name).toEqual(userSupermanUpdate.name);
    });

    it('does not update the name if the name is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      const userSupermanUpdate: Partial<IZUser> = { password: 'super-password' };
      // Act
      const updated = await target.update({ id: userSuperman._id }, userSupermanUpdate);
      // Assert
      expect(updated.name).toEqual(userSuperman.name);
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

    it('throws a ConflictException if another user has the name already.', async () => {
      // Arrange
      const target = createTestTarget();
      const user = ZUserBuilder.empty().name(userBatman.name).user();
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
