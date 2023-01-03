/* eslint-disable require-jsdoc */
import { ClientProxy } from '@nestjs/microservices';
import { createMocked } from '@zthun/spellcraft-jest';
import { ZEmailBuilder, ZServerBuilder } from '@zthun/works.core';
import { of } from 'rxjs';
import { ZNotificationsClient } from './notifications.client';

jest.mock('nodemailer');

describe('ZNotificationsClient', () => {
  let proxy: jest.Mocked<ClientProxy>;

  function createTestTarget() {
    return new ZNotificationsClient(proxy);
  }

  beforeEach(() => {
    proxy = createMocked(['send']);
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
