import { v4 } from 'uuid';
import { ZTokenBuilder } from './token-builder.class';
import { IZToken } from './token.interface';

describe('ZUserBuilder', () => {
  function createTestTarget() {
    return new ZTokenBuilder();
  }

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZTokenBuilder) => ZTokenBuilder, actualFn: (token: IZToken) => T) {
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
      assertPropertySet(id, (t) => t.token(id), (u) => u._id);
    });

    it('sets the user id.', () => {
      const user = v4();
      assertPropertySet(user, (t) => t.user(user), (u) => u.userId);
    });

    it('sets the expiration date.', () => {
      const exp = new Date().toJSON();
      assertPropertySet(exp, (t) => t.expire(exp), (u) => u.exp);
    });
  });

  describe('Redaction', () => {
    function assertRedactsProperty<T>(propFn: (u: IZToken) => T) {
      // Arrange
      const target = createTestTarget().token(v4()).user(v4()).expire(new Date());
      // Act
      const user = target.redact().build();
      const actual = propFn(user);
      // Assert
      expect(actual).toBeUndefined();
    }

    it('removes the userId.', () => {
      assertRedactsProperty((u) => u.userId);
    });
  });

  describe('Clone', () => {
    it('copies another token.', () => {
      // Arrange
      const userA = createTestTarget().token(v4()).user(v4()).expire(new Date().toJSON()).build();
      const target = createTestTarget();
      // Act
      const actual = target.copy(userA).build();
      // Assert
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(userA));
    });
  });
});
