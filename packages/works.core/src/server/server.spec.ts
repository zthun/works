/* eslint-disable require-jsdoc */
import { ZServerBuilder } from './server';

describe('ZServerBuilder.', () => {
  function createTestTarget() {
    return new ZServerBuilder();
  }

  describe('Properties', () => {
    it('should set the address.', () => {
      const expected = '10.0.0.1';
      expect(createTestTarget().address(expected).build().address).toEqual(expected);
    });

    it('should set the port.', () => {
      const expected = 4096;
      expect(createTestTarget().port(expected).build().port).toEqual(expected);
    });

    it('should set the username.', () => {
      const expected = 'admin';
      expect(createTestTarget().username(expected).build().username).toEqual(expected);
    });

    it('should set the password.', () => {
      const expected = 'bad-password';
      expect(createTestTarget().password(expected).build().password).toEqual(expected);
    });
  });

  describe('Copy', () => {
    it('should copy another server.', () => {
      const expected = createTestTarget().address('10.0.0.2').port(2096).username('admin').password('secret').build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });

  describe('Assign', () => {
    it('should assign another email.', () => {
      const address = '10.0.0.2';
      const port = 2000;
      const username = 'admin';
      const password = 'secret';
      const expected = createTestTarget().address(address).port(port).username(username).password(password).build();
      const actual = createTestTarget().address(address).port(port).assign({ username, password }).build();
      expect(actual).toEqual(expected);
    });
  });
});
