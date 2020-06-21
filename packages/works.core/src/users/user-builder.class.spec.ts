import { v4 } from 'uuid';
import { ZUserBuilder } from './user-builder.class';
import { IZUser } from './user.interface';

describe('ZUserBuilder', () => {
  function createTestTarget() {
    return new ZUserBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZUserBuilder, value: T) => ZUserBuilder, actualFn: (user: IZUser) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target, expected).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('sets the id.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.id(v),
        (u) => u._id
      );
    });

    it('sets the email.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.email(v),
        (u) => u.email
      );
    });

    it('sets the display.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.display(v),
        (u) => u.display
      );
    });

    it('sets the password.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.password(v),
        (u) => u.password
      );
    });

    it('sets the user inactive.', () => {
      assertPropertySet(
        v4(),
        (t, v) => t.inactive(v),
        (u) => u.activator
      );
    });

    it('sets the user active', () => {
      assertPropertySet(
        undefined,
        (t) => t.inactive(v4()).active(),
        (u) => u.activator
      );
    });

    it('sets the super flag.', () => {
      assertPropertySet(
        true,
        (t) => t.super(),
        (u) => u.super
      );
    });
  });

  describe('Clone', () => {
    it('copies another user.', () => {
      // Arrange
      const userA = createTestTarget().email(v4()).password(v4()).id(v4()).inactive('some-activator-password').build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(userA).build();
      // Assert
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(userA));
    });
  });
});
