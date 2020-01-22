import { ZGroupBuilder, ZPermissionBuilder } from '@zthun/auth.core';
import { v4 } from 'uuid';
import { ZGroupPermissionBuilder } from './group-permission-builder.class';
import { IZGroupPermission } from './group-permission.interface';

describe('ZGroupPermissionBuilder', () => {
  function createTestTarget() {
    return new ZGroupPermissionBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZGroupPermissionBuilder) => ZGroupPermissionBuilder, actualFn: (user: IZGroupPermission) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('calculates the id from the group and the permission.', () => {
      const groupId = v4();
      const permissionId = v4();
      const expected = `${groupId}-${permissionId}`;
      assertPropertySet(expected, (t) => t.groupId(groupId).permissionId(permissionId), (t) => t._id);
    });

    it('sets the groupId.', () => {
      const groupId = v4();
      assertPropertySet(groupId, (t) => t.groupId(groupId), (g) => g.groupId);
    });

    it('sets the group.', () => {
      const group = new ZGroupBuilder().id('admin').name('Administrators').system().build();
      assertPropertySet([group], (t) => t.group(group), (g) => g.group);
    });

    it('sets the permissionId.', () => {
      const permissionId = v4();
      assertPropertySet(permissionId, (t) => t.permissionId(permissionId), (g) => g.permissionId);
    });

    it('sets the permission.', () => {
      const permission = new ZPermissionBuilder().id('read').name('Read').system().build();
      assertPropertySet([permission], (t) => t.permission(permission), (g) => g.permission);
    });
  });

  describe('Copy', () => {
    it('copies another group.', () => {
      // Arrange
      const expected = createTestTarget().groupId('group').permissionId('permission').build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(expected).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('assigns updated properties.', () => {
      // Arrange
      const original = createTestTarget().groupId('group').permissionId('permission').build();
      const expected = createTestTarget().copy(original).groupId('group-new').build();
      const target = createTestTarget().copy(original);
      // Act
      const actual = target.assign({ groupId: 'group-new' }).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Redact', () => {
    it('removes the group array.', () => {
      // Arrange
      const group = new ZGroupBuilder().id('group').name('Group').build();
      const target = createTestTarget().group(group).permissionId(v4());
      // Act
      const actual = target.redact().build();
      // Assert
      expect(actual.group).toBeFalsy();
    });

    it('removes the permission array.', () => {
      // Arrange
      const permission = new ZPermissionBuilder().id('permission').name('Permission').build();
      const target = createTestTarget().permission(permission).groupId(v4());
      // Act
      const actual = target.redact().build();
      // Assert
      expect(actual.permission).toBeFalsy();
    });
  });
});
