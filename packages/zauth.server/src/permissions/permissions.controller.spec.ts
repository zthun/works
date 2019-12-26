import { BadRequestException, ConflictException } from '@nestjs/common';
import { IZPermission, ZPermissionBuilder } from '@zthun/auth.core';
import { createSpyObj } from 'jest-createspyobj';
import { ZCrudService } from '../crud/crud.service';
import { ZPermissionsController } from './permissions.controller';

describe('ZPermissionsController', () => {
  let permission: IZPermission;
  let crud: jest.Mocked<ZCrudService>;

  function createTestTarget() {
    return new ZPermissionsController(crud);
  }

  beforeEach(() => {
    permission = new ZPermissionBuilder().id('do-the-things').name('Do the things').description('Test mock permission.').build();

    crud = createSpyObj(ZCrudService, ['list', 'read', 'create', 'update', 'remove', 'find']);
    crud.list.mockResolvedValue([permission]);
    crud.read.mockResolvedValue(permission);
    crud.create.mockResolvedValue(permission);
    crud.update.mockResolvedValue(permission);
    crud.remove.mockResolvedValue(permission);
    crud.find.mockResolvedValue(null);
  });

  describe('List', () => {
    it('returns the items from the crud service.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual([permission]);
    });
  });

  describe('Create', () => {
    it('creates the items from the crud service.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.create(permission);
      // Assert
      expect(actual).toEqual(permission);
    });
  });

  describe('Read', () => {
    it('reads an item from the crud service.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read({ _id: permission._id });
      // Assert
      expect(actual).toEqual(permission);
    });
  });

  describe('Update', () => {
    it('updates an item from the crud service.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.update({ _id: permission._id }, permission);
      // Assert
      expect(actual).toEqual(permission);
    });
  });

  describe('Delete', () => {
    it('deletes the item from the crud service.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.remove({ _id: permission._id });
      // Assert
      expect(actual).toEqual(permission);
    });
  });

  describe('Validation', () => {
    describe('Create', () => {
      it('returns the item on valid groups.', async () => {
        // Arrange
        const target = createTestTarget();
        const expected = new ZPermissionBuilder().copy(permission).build();
        // Act
        const actual = await target.validateCreate(permission);
        // Assert
        expect(actual).toEqual(expected);
      });

      it('throws a BadRequestException if the name is blank.', async () => {
        // Arrange
        const target = createTestTarget();
        permission.name = '\t \r';
        // Act
        // Assert
        await expect(target.validateCreate(permission)).rejects.toBeInstanceOf(BadRequestException);
      });

      it('throws a BadRequestException if the id is blank.', async () => {
        // Arrange
        const target = createTestTarget();
        permission._id = '\t \r';
        // Act
        // Assert
        await expect(target.validateCreate(permission)).rejects.toBeInstanceOf(BadRequestException);
      });

      it('throws a ConflictException if the id already exists.', async () => {
        // Arrange
        const target = createTestTarget();
        crud.find.mockResolvedValue(permission);
        // Act
        // Assert
        await expect(target.validateCreate(permission)).rejects.toBeInstanceOf(ConflictException);
      });
    });

    describe('Update', () => {
      it('returns the item with the orignal id and the updated properties on valid permissions.', async () => {
        // Arrange
        const target = createTestTarget();
        const name = 'renamed-item';
        const expected = new ZPermissionBuilder().copy(permission).name(name).build();
        // Act
        const actual = await target.validateUpdate(permission, { _id: 'should-be-ignored', name });
        // Assert
        expect(actual).toEqual(expected);
      });

      it('throws a BadRequestException if the name is blank.', async () => {
        // Arrange
        const target = createTestTarget();
        // Act
        // Assert
        await expect(target.validateUpdate(permission, { name: '\r  \n' })).rejects.toBeInstanceOf(BadRequestException);
      });
    });

    describe('Remove', () => {
      it('throws a BadRequestException if system is truthy.', async () => {
        // Arrange
        const target = createTestTarget();
        permission.system = true;
        // Act
        // Assert
        await expect(target.validateRemove(permission)).rejects.toBeInstanceOf(BadRequestException);
      });

      it('returns if pending is ready for delete.', async () => {
        // Arrange
        const target = createTestTarget();
        // Act
        const actual = await target.validateRemove(permission);
        // Assert
        expect(actual).toBeUndefined();
      });
    });
  });
});
