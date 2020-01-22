import { ZGroupBuilder, ZUserBuilder } from '@zthun/auth.core';
import { v4 } from 'uuid';
import { ZGroupUserBuilder } from './group-user-builder.class';
import { IZGroupUser } from './group-user.interface';

describe('ZGroupUserBuilder', () => {
  function createTestTarget() {
    return new ZGroupUserBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZGroupUserBuilder) => ZGroupUserBuilder, actualFn: (user: IZGroupUser) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('calculates the id from the group and the user.', () => {
      const groupId = v4();
      const userId = v4();
      const expected = `${groupId}-${userId}`;
      assertPropertySet(expected, (t) => t.groupId(groupId).userId(userId), (t) => t._id);
    });

    it('sets the groupId.', () => {
      const groupId = v4();
      assertPropertySet(groupId, (t) => t.groupId(groupId), (g) => g.groupId);
    });

    it('sets the group.', () => {
      const group = new ZGroupBuilder().id('admin').name('Administrators').system().build();
      assertPropertySet([group], (t) => t.group(group), (g) => g.group);
    });

    it('sets the userId.', () => {
      const userId = v4();
      assertPropertySet(userId, (t) => t.userId(userId), (g) => g.userId);
    });

    it('sets the permission.', () => {
      const user = new ZUserBuilder().id('batman').email('batman@dc.com').build();
      assertPropertySet([user], (t) => t.user(user), (g) => g.user);
    });
  });

  describe('Copy', () => {
    it('copies another group.', () => {
      // Arrange
      const expected = createTestTarget().groupId('group').userId('user').build();
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
      const original = createTestTarget().groupId('group').userId('user').build();
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
      const target = createTestTarget().group(group).userId(v4());
      // Act
      const actual = target.redact().build();
      // Assert
      expect(actual.group).toBeFalsy();
    });

    it('removes the user array.', () => {
      // Arrange
      const user = new ZUserBuilder().id('user').build();
      const target = createTestTarget().user(user).groupId(v4());
      // Act
      const actual = target.redact().build();
      // Assert
      expect(actual.user).toBeFalsy();
    });
  });
});
