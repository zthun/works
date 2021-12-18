import { ClientProxy } from '@nestjs/microservices';
import { ZConfigEntryBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
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

  function assertSendsMessage<T>(cmd: string, payload: T, sendFn: (t: ZVaultClient, p: T) => Promise<any>) {
    // Arrange.
    const target = createTestTarget();
    // Act.
    sendFn(target, payload);
    // Assert.
    expect(proxy.send).toHaveBeenCalledWith({ cmd }, payload);
  }

  describe('Read', () => {
    it('gets by scope and key.', () => {
      assertSendsMessage('read', { scope: 'common', key: 'domain' }, (t, p) => t.read(p.scope, p.key));
    });

    it('gets by entry.', () => {
      const entry = new ZConfigEntryBuilder().scope('common').key('domain').build();
      assertSendsMessage('get', { entry }, (t, p) => t.get(p.entry));
    });
  });

  describe('Write', () => {
    it('puts by entry.', () => {
      const entry = new ZConfigEntryBuilder().scope('common').key('domain').value('local.zthunworks.com').build();
      assertSendsMessage('put', { entry }, (t, p) => t.put(p.entry));
    });
  });
});
