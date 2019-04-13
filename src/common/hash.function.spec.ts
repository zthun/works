import { sha256 } from 'js-sha256';
import { env } from 'process';
import { v4 } from 'uuid';
import { STATIC_PEPPER, zsha256 } from './hash.function';

describe('Hashing', () => {
  let salt: string;
  let password: string;
  let pepper: string;

  beforeEach(() => {
    password = 'should-fool-the-government';
    pepper = env.AUTH_PEPPER;
    salt = v4();
  });

  afterEach(() => {
    env.AUTH_PEPPER = pepper;
  });

  describe('zsha256', () => {
    it('hashes with the environment pepper.', () => {
      // Arrange
      const epep = v4();
      env.AUTH_PEPPER = epep;
      const expected = sha256(`${salt}${password}${epep}`);
      // Act
      const actual = zsha256(password, salt);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('hashes with the static pepper if no environment pepper exists.', () => {
      // Arrange
      delete env.AUTH_PEPPER;
      const expected = sha256(`${salt}${password}${STATIC_PEPPER}`);
      // Act
      const actual = zsha256(password, salt);
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
