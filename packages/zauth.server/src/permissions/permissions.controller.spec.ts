import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IZPermission, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { ZPermissionsController } from './permissions.controller';

describe('ZPermissionsController', () => {
  let read: IZPermission;
  let write: IZPermission;
  let execute: IZPermission;
  let dal: IZDatabase;

  function createTestTarget() {
    return new ZPermissionsController(dal);
  }

  beforeAll(() => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('permissions-controller-test').build());
  });

  beforeEach(async () => {
    read = new ZPermissionBuilder().id('read').name('Read').build();
    write = new ZPermissionBuilder().id('write').name('Write').build();
    execute = new ZPermissionBuilder().id('execute').name('Execute').system().build();
    await dal.create(Collections.Permissions, [execute]).run();
  });

  afterEach(async () => {
    await dal.delete(Collections.Permissions).run();
  });

  describe('List', () => {
    beforeEach(async () => {
      [read, write] = await dal.create(Collections.Permissions, [read, write]).run();
    });

    it('returns the items.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual([execute, read, write]);
    });
  });

  describe('Create', () => {
    it('creates the item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const created = await target.create(read);
      const [actual] = await dal.read(Collections.Permissions).filter({ _id: created._id }).run();
      // Assert
      expect(actual).toEqual(created);
    });

    it('throws a ConflictException if the name exists.', async () => {
      // Arrange
      const target = createTestTarget();
      const old = new ZPermissionBuilder().copy(read).id('read-existing').build();
      await dal.create(Collections.Permissions, [old]).run();
      // Act
      const promise = target.create(read);
      // Assert
      await expect(promise).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a ConflictException if the id exists.', async () => {
      // Arrange
      const target = createTestTarget();
      const old = new ZPermissionBuilder().copy(read).name('Read Existing').build();
      await dal.create(Collections.Permissions, [old]).run();
      // Act
      const promise = target.create(read);
      // Assert
      await expect(promise).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('Read', () => {
    it('reads an item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read({ _id: execute._id });
      // Assert
      expect(actual).toEqual(execute);
    });

    it('throws a NotFoundException if the item does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.read({ _id: 'not-a-valid-id' });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Update', () => {
    it('updates an item.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = Object.assign({}, execute, { name: 'Execute Permission' });
      // Act
      const actual = await target.update({ _id: execute._id }, { name: 'Execute Permission' });
      // Assert
      expect(actual).toEqual(expected);
    });

    it('updates an item with itself (identity).', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = execute;
      // Act
      const actual = await target.update({ _id: execute._id }, { name: execute.name });
      // Assert
      expect(actual).toEqual(expected);
    });

    it('throws a NotFoundException if the item does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.update({ _id: 'not-an-item' }, { name: 'What?' });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a ConflictException if the update name conflicts with another item.', async () => {
      // Arrange
      const target = createTestTarget();
      await dal.create(Collections.Permissions, [read]).run();
      // Act
      const promise = target.update({ _id: execute._id }, { name: read.name });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      [read] = await dal.create(Collections.Permissions, [read]).run();
    });

    it('deletes the item.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.remove({ _id: read._id });
      // Assert
      expect(actual).toEqual(read);
    });

    it('throws a NotFouncException if the item does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.remove({ _id: write._id });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a ForbiddenException if the permission is a system permission.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const promise = target.remove({ _id: execute._id });
      // Assert
      await expect(promise).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
