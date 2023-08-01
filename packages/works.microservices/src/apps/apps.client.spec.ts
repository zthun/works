import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZAppsClient } from './apps.client';

describe('ZAppsClient', () => {
  let proxy: Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZAppsClient(proxy);
  }

  beforeEach(() => {
    proxy = mock<ClientProxy>();
    proxy.send.mockReturnValue(of(null));
  });

  describe('Web Apps', () => {
    it('lists all web apps.', async () => {
      // Arrange.
      const target = createTestTarget();
      // Act.
      await target.listWebApps();
      // Assert.
      expect(proxy.send).toHaveBeenCalledWith({ cmd: 'listWebApps' }, {});
    });
  });
});
