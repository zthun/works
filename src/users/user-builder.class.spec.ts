import { env } from 'process';
import { v4 } from 'uuid';
import { ZUserBuilder } from './user-builder.class';
import { IZUser } from './user.interface';

describe('ZUserBuilder', () => {
  describe('Properties', () => {
    function assertPropertySet<T>(expected: T, buildFn: (target: ZUserBuilder) => ZUserBuilder, actualFn: (user: IZUser) => T) {
      // Arrange
      const target = ZUserBuilder.empty();
      // Act
      const user = buildFn(target).user();
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

    it('sets the salt.', () => {
      const salt = v4();
      assertPropertySet(salt, (t) => t.salt(salt), (u) => u.salt);
    });
  });

  describe('Redaction', () => {
    it('removes the password.', () => {
      // Arrange
      const target = ZUserBuilder.empty().id('id').email('name').password('password').salt('salt').user();
      // Act
      const actual = ZUserBuilder.public(target).user();
      // Assert
      expect(actual.password).toBeFalsy();
    });

    it('removes the salt.', () => {
      // Arrange
      const target = ZUserBuilder.empty().id('id').email('name').password('password').salt('salt').user();
      // Act
      const actual = ZUserBuilder.public(target).user();
      // Assert
      expect(actual.salt).toBeFalsy();
    });
  });

  describe('Security', () => {
    let pepper: string;

    beforeEach(() => {
      pepper = env.AUTH_PEPPER;
    });

    afterEach(() => {
      env.AUTH_PEPPER = pepper;
    });

    it('encrypts the password.', () => {
      // Arrange
      const pwd = 'password1';
      const target = ZUserBuilder.empty().salt(v4()).password(pwd);
      // Act
      const actual = target.encode().user();
      // Assert
      expect(actual.password).not.toEqual(pwd);
    });

    it('encrypts the password with a pepper of env.AUTH_PEPPER', () => {
      // Arrange
      env.AUTH_PEPPER = v4();
      const pwd = 'password1';
      const target = ZUserBuilder.empty().salt(v4()).password(pwd);
      // Act
      const actual = target.encode().user();
      // Assert
      expect(actual.password).not.toEqual(pwd);
    });
  });
});
