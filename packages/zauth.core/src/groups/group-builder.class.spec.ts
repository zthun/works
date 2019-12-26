import { ZGroupBuilder } from './group-builder.class';
import { IZGroup } from './group.interface';

describe('ZGroupBuilder', () => {
  const batman = 'batman';
  const superman = 'superman';
  const flash = 'flash';
  const users = [batman, superman, flash];
  const red = 'red';
  const green = 'green';
  const blue = 'blue';
  const permissions = [red, green, blue];

  function createTestTarget() {
    return new ZGroupBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZGroupBuilder) => ZGroupBuilder, actualFn: (user: IZGroup) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('sets the id.', () => {
      const id2 = 'test-id-2';
      assertPropertySet(id2, (t) => t.id(id2), (g) => g._id);
    });

    it('sets the name.', () => {
      const name = 'Test Name';
      assertPropertySet(name, (t) => t.name(name), (g) => g.name);
    });

    it('adds a user.', () => {
      assertPropertySet(users, (t) => t.user(batman).user(superman).user(flash), (g) => g.users);
    });

    it('sets the users.', () => {
      assertPropertySet(users, (t) => t.users(users), (g) => g.users);
    });

    it('sets the system flag', () => {
      assertPropertySet(true, (t) => t.system(), (g) => g.system);
    });

    it('reinitializes the users.', () => {
      assertPropertySet([], (t) => t.user(batman).users(null), (g) => g.users);
    });

    it('adds a permission.', () => {
      assertPropertySet(permissions, (t) => t.permission(red).permission(green).permission(blue), (g) => g.permissions);
    });

    it('sets the permissions.', () => {
      assertPropertySet(permissions, (t) => t.permissions(permissions), (g) => g.permissions);
    });

    it('reinitializes the permissions.', () => {
      assertPropertySet([], (t) => t.permission(red).permissions(null), (g) => g.permissions);
    });
  });

  describe('Copy', () => {
    it('copies another permission.', () => {
      // Arrange
      const expected = createTestTarget().name('copied-group').id('copy').build();
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
      const original = createTestTarget().id('p-id').name('p-name').users(users).permissions(permissions).build();
      const expected = createTestTarget().copy(original).name('updated-name').permissions([]).build();
      const target = createTestTarget().copy(original);
      // Act
      const actual = target.assign({ name: expected.name, permissions: expected.permissions }).build();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
