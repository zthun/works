import { v4 } from 'uuid';
import { ZUserBuilder } from './user-builder.class';
import { IZUser } from './user.interface';

describe('ZUserBuilder', () => {
  function createTestTarget() {
    return new ZUserBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZUserBuilder) => ZUserBuilder, actualFn: (user: IZUser) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const user = buildFn(target).build();
      const actual = actualFn(user);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('sets the id.', () => {
      const id = v4();
      assertPropertySet(id, (t) => t.id(id), (u) => u._id);
    });

    it('sets the name.', () => {
      const name = v4();
      assertPropertySet(name, (t) => t.email(name), (u) => u.email);
    });

    it('sets the password.', () => {
      const pwd = v4();
      assertPropertySet(pwd, (t) => t.password(pwd), (u) => u.password);
    });

    it('sets the login.', () => {
      assertPropertySet(true, (t) => t.login(), (u) => !!u.login);
    });

    it('sets the logout.', () => {
      assertPropertySet(true, (t) => t.logout(), (u) => !!u.logout);
    });
  });

  describe('Redaction', () => {
    function assertRedactsProperty<T>(propFn: (u: IZUser) => T) {
      // Arrange
      const target = createTestTarget().id(v4()).email(v4()).password(v4());
      // Act
      const user = target.redact().build();
      const actual = propFn(user);
      // Assert
      expect(actual).toBeUndefined();
    }

    it('removes the password.', () => {
      assertRedactsProperty((u) => u.password);
    });
  });

  describe('Clone', () => {
    it('copies another user.', () => {
      // Arrange
      const userA = createTestTarget().email(v4()).password(v4()).id(v4()).build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(userA).build();
      // Assert
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(userA));
    });
  });
});
