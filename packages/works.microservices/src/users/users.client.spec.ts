import { ClientProxy } from '@nestjs/microservices';
import { ZUsersClient } from './users.client';
import { assertProxySendsMessage, createMocked } from '@zthun/works.jest';
import { of } from 'rxjs';
import { v4 } from 'uuid';
import { ZLoginBuilder, ZProfileBuilder, ZUserBuilder } from '@zthun/works.core';

/* eslint-disable require-jsdoc */
describe('UsersClient', () => {
  let proxy: jest.Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZUsersClient(proxy);
  }

  beforeEach(() => {
    proxy = createMocked(['send']);
    proxy.send.mockReturnValue(of(null));
  });

  describe('Find', () => {
    it('finds by id.', async () => {
      await assertProxySendsMessage({ cmd: 'find' }, { _id: v4() }, proxy, createTestTarget, (t, p) => t.findById(p._id));
    });

    it('finds by email.', async () => {
      await assertProxySendsMessage({ cmd: 'find' }, { email: 'test@mail.com' }, proxy, createTestTarget, (t, p) => t.findByEmail(p.email));
    });
  });

  describe('Create', () => {
    it('creates a user.', async () => {
      const login = new ZLoginBuilder().email('test@email.com').password('bad-password').build();
      await assertProxySendsMessage({ cmd: 'create' }, { login }, proxy, createTestTarget, (t, p) => t.create(p.login));
    });
  });

  describe('Update', () => {
    it('should update a profile.', async () => {
      const profile = new ZProfileBuilder().email('test@email.com').build();
      await assertProxySendsMessage({ cmd: 'update' }, { id: v4(), profile }, proxy, createTestTarget, (t, p) => t.update(p.id, p.profile));
    });
  });

  describe('Delete', () => {
    it('should delete a profile.', async () => {
      await assertProxySendsMessage({ cmd: 'remove' }, { id: v4() }, proxy, createTestTarget, (t, p) => t.remove(p.id));
    });
  });

  describe('Login', () => {
    it('timestamps the user login.', async () => {
      await assertProxySendsMessage({ cmd: 'login' }, { id: v4() }, proxy, createTestTarget, (t, p) => t.login(p.id));
    });

    it('recovers a lost password.', async () => {
      await assertProxySendsMessage({ cmd: 'recover' }, { email: 'test@email.com' }, proxy, createTestTarget, (t, p) => t.recover(p.email));
    });

    it('checks the user/password combination.', async () => {
      const credentials = new ZLoginBuilder().email('test@email.com').password('bad-password').build();
      await assertProxySendsMessage({ cmd: 'compare' }, { credentials }, proxy, createTestTarget, (t, p) => t.compare(p.credentials));
    });
  });

  describe('Activation', () => {
    it('should activate a user.', async () => {
      const user = new ZUserBuilder().email('test@email.com').build();
      await assertProxySendsMessage({ cmd: 'activate' }, { user }, proxy, createTestTarget, (t, p) => t.activate(p.user));
    });

    it('should deactivate a profile.', async () => {
      const user = new ZUserBuilder().email('test@email.com').build();
      await assertProxySendsMessage({ cmd: 'deactivate' }, { user }, proxy, createTestTarget, (t, p) => t.deactivate(p.user));
    });
  });
});
