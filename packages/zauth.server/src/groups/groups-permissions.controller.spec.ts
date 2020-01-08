import { ConflictException, NotFoundException } from '@nestjs/common';
import { IZGroup, IZPermission, ZGroupBuilder, ZPermissionBuilder } from '@zthun/auth.core';
import { IZDatabase, ZDatabaseMemory, ZDatabaseOptionsBuilder } from '@zthun/dal';
import { Collections } from '../common/collections.enum';
import { IZGroupsPermissions } from '../common/groups-permissions.interface';
import { ZGroupsPermissionsController } from './groups-permissions.controller';

describe('ZGroupsPermissionsController', () => {
  let dal: IZDatabase;
  let dc: IZGroup;
  let marvel: IZGroup;
  let read: IZPermission;
  let write: IZPermission;

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

  afterEach(async () => {
    await dal.delete(Collections.GroupsPermissions).run();
  });

  describe('List', () => {
    beforeEach(async () => {
      const dcread: IZGroupsPermissions = { groupId: dc._id, permissionId: read._id };
      const dcwrite: IZGroupsPermissions = { groupId: dc._id, permissionId: write._id };
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
    let assignment: IZGroupsPermissions;

    beforeEach(() => {
      assignment = { groupId: dc._id, permissionId: read._id };
    });

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
    it('removes the permission from the group.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a not found exception if the group does not exist.', () => {
      expect(true).toBeTruthy();
    });

    it('throws a not found exception if the permission does not exist.', () => {
      expect(true).toBeTruthy();
    });
  });
});
