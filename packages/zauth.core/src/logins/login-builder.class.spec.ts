import { v4 } from 'uuid';
import { ZLoginBuilder } from './login-builder.class';
import { IZLogin } from './login.interface';

describe('ZLoginBuilder', () => {
  function createTestTarget() {
    return new ZLoginBuilder();
  }

  describe('From', () => {
    it('creates a copy', () => {
      // Arrange
      const other = new ZLoginBuilder().email(v4()).password(v4()).autoConfirm().login();
      const target = createTestTarget();
      // Act
      const actual = target.from(other).login();
      // Assert
      expect(actual).not.toBe(other);
      expect(actual).toEqual(other);
    });
  });

  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZLoginBuilder) => ZLoginBuilder, actualFn: (user: IZLogin) => T) {
      // Arrange
      const target = createTestTarget();
      // Act
      const login = buildFn(target).login();
      const actual = actualFn(login);
      // Assert
      expect(actual).toEqual(expected);
    }

    it('sets the email.', () => {
      const email = v4();
      assertPropertySet(email, (t) => t.email(email), (u) => u.email);
    });

    it('sets the password.', () => {
      const pwd = v4();
      assertPropertySet(pwd, (t) => t.password(pwd), (u) => u.password);
    });

    it('sets the confirm.', () => {
      const confirm = v4();
      assertPropertySet(confirm, (t) => t.confirm(confirm), (u) => u.confirm);
    });
  });

  describe('Confirmation', () => {
    it('auto sets the confirm to the password.', () => {
      // Arrange
      const target = createTestTarget().password('foo');
      // Act
      const actual = target.autoConfirm().login();
      // Assert
      expect(actual.confirm).toEqual(actual.password);
    });
  });
});
