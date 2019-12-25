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
});
