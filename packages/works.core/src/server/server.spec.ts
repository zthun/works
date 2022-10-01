/* eslint-disable require-jsdoc */
import { assertBuilderAssignsObject, assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { IZServer, ZServerBuilder } from './server';

describe('ZServerBuilder.', () => {
  function createTestTarget() {
    return new ZServerBuilder();
  }

  describe('Properties', () => {
    it('should set the address.', () => {
      assertBuilderSetsProperty(
        '10.0.0.1',
        createTestTarget,
        (t, v) => t.address(v),
        (c: IZServer) => c.address
      );
    });

    it('should set the port.', () => {
      assertBuilderSetsProperty(
        4096,
        createTestTarget,
        (t, v) => t.port(v),
        (c: IZServer) => c.port
      );
    });

    it('should set the username.', () => {
      assertBuilderSetsProperty(
        'admin',
        createTestTarget,
        (t, v) => t.username(v),
        (c: IZServer) => c.username
      );
    });

    it('should set the password.', () => {
      assertBuilderSetsProperty(
        'secret',
        createTestTarget,
        (t, v) => t.password(v),
        (c: IZServer) => c.password
      );
    });
  });

  describe('Copy', () => {
    it('should copy another server.', () => {
      assertBuilderCopiesObject(
        createTestTarget().address('10.0.0.2').port(2096).username('admin').password('secret').build(),
        createTestTarget
      );
    });
  });

  describe('Assign', () => {
    it('should assign another email.', () => {
      const address = '10.0.0.2';
      const port = 2000;
      const username = 'admin';
      const password = 'secret';
      assertBuilderAssignsObject(
        createTestTarget().address(address).port(port).username(username).password(password).build(),
        () => createTestTarget().address(address).port(port),
        { username, password }
      );
    });
  });
});
