import { BadRequestException, ConflictException, NotFoundException, UseGuards } from '@nestjs/common';
import { IZPermission, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZPermissionsController } from './permissions.controller';

describe('ZPermissionsController', () => {
  let dal: IZDatabase;
  let permissionA: IZPermission;
  let permissionB: IZPermission;

  beforeAll(() => {
    dal = ZDatabaseMemory.connect('permission-controller-test');
  });

  beforeEach(async () => {
    permissionA = new ZPermissionBuilder().id('permission-a').name('Permission A').description('First permission').build();
    permissionB = new ZPermissionBuilder().id('permission-b').name('Permission B').description('Second permission').build();
  });

  afterEach(async () => {
    await dal.delete(Collections.Permissions).run();
  });

  function createTestTarget() {
    return new ZPermissionsController(dal);
  }

  describe('List', () => {
    beforeEach(async () => {
      await dal.create(Collections.Permissions, [permissionA, permissionB]).run();
    });

    it('returns all permissions.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = [permissionA, permissionB];
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Create', () => {
    it('creates a permission.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(permissionA);
      const blobs = await dal.read<IZPermission>(Collections.Permissions).filter({ _id: created._id }).run();
      const actual = blobs[0];
      // Assert
      expect(actual._id).toEqual(permissionA._id);
    });

    it('throws a ConflictException if the id already exists.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.create(Collections.Permissions, [permissionA]).run();
      // Act
      // Assert
      await expect(target.create(permissionA)).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a BadRequestException if the id is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      delete permissionA._id;
      // Act
      // Assert
      await expect(target.create(permissionA)).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws a BadRequestException if the name is not set.', async () => {
      // Arrange
      const target = createTestTarget();
      delete permissionA.name;
      // Act
      // Assert
      await expect(target.create(permissionA)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Read', () => {
    beforeEach(async () => {
      await dal.create(Collections.Permissions, [permissionA, permissionB]).run();
    });

    it('reads a permission.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read({ _id: permissionA._id });
      // Assert
      expect(actual._id).toEqual(permissionA._id);
    });

    it('throws a NotFoundException if no permission exists.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.read({ _id: 'no-permission-exists' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      await dal.create(Collections.Permissions, [permissionA, permissionB]).run();
    });

    it('updates the permission.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = new ZPermissionBuilder().copy(permissionA).name('updated-permission-a').build();
      // Act
      await target.update({ _id: permissionA._id }, expected);
      expected._id = permissionA._id;
      const blobs = await dal.read<IZPermission>(Collections.Permissions).filter({ _id: permissionA._id }).run();
      const actual = blobs[0];
      // Assert
      expect(actual).toEqual(expected);
    });

    it('updates only the description if the name is undefined.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = new ZPermissionBuilder().copy(permissionA).description('updated-description').build();
      // Act
      const actual = await target.update({ _id: permissionA._id }, { description: expected.description });
      // Assert
      expect(actual).toEqual(expected);
    });

    it('throws a NotFoundException if the permission does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      const permission = new ZPermissionBuilder().name('some-name').build();
      // Act
      // Assert
      await expect(target.update({ _id: 'does-not-exist' }, permission)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a BadRequestException if the name is falsy.', async () => {
      // Arrange
      const target = createTestTarget();
      const permission = new ZPermissionBuilder().copy(permissionA).name('').build();
      // Act
      // Assert
      await expect(target.update({ _id: permissionA._id }, permission)).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      await dal.create(Collections.Permissions, [permissionA]).run();
    });

    it('deletes the permission.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove({ _id: permissionA._id });
      const blobs = await dal.read(Collections.Permissions).filter({ _id: permissionA._id }).run();
      // Assert
      expect(blobs.length).toEqual(0);
    });

    it('throws a NotFoundException if there is no permission.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.remove({ _id: 'n/a' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
