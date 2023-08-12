import { ClientProxy } from '@nestjs/microservices';
import { ZEmailBuilder, ZServerBuilder } from '@zthun/helpful-internet';
import { of } from 'rxjs';
import { Mocked, beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZNotificationsClient } from './notifications.client';

vi.mock('nodemailer');

describe('ZNotificationsClient', () => {
  let proxy: Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZNotificationsClient(proxy);
  }

  beforeEach(() => {
    proxy = mock<ClientProxy>();
    proxy.send.mockReturnValue(of(null));
  });

  describe('Email', () => {
    it('sends an email.', async () => {
      // Arrange.
      const msg = new ZEmailBuilder().build();
      const smtp = new ZServerBuilder().build();
      const target = createTestTarget();
      // Act.
      await target.sendEmail(msg, smtp);
      // Assert.
      expect(proxy.send).toHaveBeenCalledWith({ cmd: 'sendEmail' }, { msg, smtp });
    });
  });
});
