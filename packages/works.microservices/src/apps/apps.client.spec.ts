/* eslint-disable require-jsdoc */
import { ClientProxy } from '@nestjs/microservices';
import { createMocked } from '@zthun/spellcraft-jest';
import { of } from 'rxjs';
import { ZAppsClient } from './apps.client';

describe('ZAppsClient', () => {
  let proxy: jest.Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZAppsClient(proxy);
  }

  beforeEach(() => {
    proxy = createMocked(['send']);
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
