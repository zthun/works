import { ClientProxy } from '@nestjs/microservices';
import { ZConfigEntryBuilder } from '@zthun/works.core';
import { assertProxySendsMessage, createMocked } from '@zthun/works.jest';
import { of } from 'rxjs';
import { ZVaultClient } from './vault.client';

/* eslint-disable require-jsdoc */
describe('VaultClient', () => {
  let proxy: jest.Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZVaultClient(proxy);
  }

  beforeEach(() => {
    proxy = createMocked(['send']);
    proxy.send.mockReturnValue(of(null));
  });

  describe('Read', () => {
    it('gets by scope and key.', async () => {
      await assertProxySendsMessage({ cmd: 'read' }, { scope: 'common', key: 'domain' }, proxy, createTestTarget, (t, p) => t.read(p.scope, p.key));
    });

    it('gets by entry.', async () => {
      const entry = new ZConfigEntryBuilder().scope('common').key('domain').build();
      await assertProxySendsMessage({ cmd: 'get' }, { entry }, proxy, createTestTarget, (t, p) => t.get(p.entry));
    });
  });

  describe('Write', () => {
    it('puts by entry.', async () => {
      const entry = new ZConfigEntryBuilder().scope('common').key('domain').value('local.zthunworks.com').build();
      await assertProxySendsMessage({ cmd: 'put' }, { entry }, proxy, createTestTarget, (t, p) => t.put(p.entry));
    });
  });
});
