import { ConflictException, NotFoundException } from '@nestjs/common';
import { IZGroup, IZPermission, ZGroupBuilder, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { IZGroupPermission } from '../common/group-permission.interface';
import { ZGroupsPermissionsController } from './groups-permissions.controller';
import { ZGroupPermissionBuilder } from '../common/group-permission-builder.class';

describe('ZGroupsPermissionsController', () => {
  let dal: IZDatabase;
  let dc: IZGroup;
  let marvel: IZGroup;
  let read: IZPermission;
  let write: IZPermission;
  let assignment: IZGroupPermission;

  function createTestTarget() {
    return new ZGroupsPermissionsController(dal);
  }

  beforeAll(async () => {
    dal = ZDatabaseMemory.connect(new ZDatabaseOptionsBuilder().database('group-controller-test').timeout(1000).build());

    dc = new ZGroupBuilder().name('DC').system().build();
    marvel = new ZGroupBuilder().name('Marvel').build();
    read = new ZPermissionBuilder().name('Read').system().build();
    write = new ZPermissionBuilder().name('Write').system().build();

    [dc, marvel] = await dal.create(Collections.Groups, [dc, marvel]).run();
    [read, write] = await dal.create(Collections.Permissions, [read, write]).run();
  });

  afterAll(async () => {
    await dal.delete(Collections.Groups).run();
    await dal.delete(Collections.Permissions).run();
  });

  beforeEach(() => {
    assignment = new ZGroupPermissionBuilder().groupId(dc._id).permissionId(read._id).build();
  });

  afterEach(async () => {
    await dal.delete(Collections.GroupsPermissions).run();
  });

  describe('List', () => {
    beforeEach(async () => {
      const dcread: IZGroupPermission = new ZGroupPermissionBuilder().groupId(dc._id).permissionId(read._id).build();
      const dcwrite: IZGroupPermission = new ZGroupPermissionBuilder().groupId(dc._id).permissionId(write._id).build();
      await dal.create(Collections.GroupsPermissions, [dcread, dcwrite]).run();
    });

    it('lists all permissions assigned to the group.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list({ groupId: dc._id });
      // Assert
      expect(actual).toEqual([read, write]);
    });

    it('throws a not found exception if the group does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      // Assert
      await expect(target.list({ groupId: 'does-not-exist' })).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Update', () => {
    it('assigns a given permission to a group.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update(assignment);
      const [actual] = await dal.read(Collections.GroupsPermissions).filter(assignment).run();
      // Assert
      expect(actual).toEqual(expect.objectContaining(assignment));
    });

    it('throws a ConflictException if the group already has the permission to be assigned.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.update(assignment);
      // Assert
      await expect(target.update(assignment)).rejects.toBeInstanceOf(ConflictException);
    });

    it('throws a not found exception if the group does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.groupId = 'does-not-exist';
      // Act
      // Assert
      await expect(target.update(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a not found exception if the permission does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.permissionId = 'does-not-exist';
      // Act
      // Assert
      await expect(target.update(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('Delete', () => {
    beforeEach(async () => {
      await dal.create(Collections.GroupsPermissions, [assignment]).run();
    });

    it('removes the permission from the group.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      await target.remove(assignment);
      const [actual] = await dal.read<IZGroupPermission>(Collections.GroupsPermissions).filter(assignment).run();
      // Assert
      expect(actual).toBeFalsy();
    });

    it('throws a not found exception if the assignment does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.groupId = marvel._id;
      assignment.permissionId = write._id;
      // Act
      // Assert
      await expect(target.remove(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a not found exception if the group does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.groupId = 'i-do-not-exist';
      // Act
      // Assert
      await expect(target.remove(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a not found exception if the permission does not exist.', async () => {
      // Arrange
      const target = createTestTarget();
      assignment.permissionId = 'i-do-not-exist';
      // Act
      // Assert
      await expect(target.remove(assignment)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
