/* eslint-disable require-jsdoc */
import { ClientProxy } from '@nestjs/microservices';
import { IZEmail, IZServer, ZEmailBuilder, ZServerBuilder } from '@zthun/works.core';
import { assertProxySendsMessage, createMocked } from '@zthun/works.jest';
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
    let msg: IZEmail;
    let smtp: IZServer;

    beforeEach(() => {
      msg = new ZEmailBuilder().build();
      smtp = new ZServerBuilder().build();
    });

    it('sends an email.', async () => {
      await assertProxySendsMessage({ cmd: 'sendEmail' }, { msg, smtp }, proxy, createTestTarget, (t, p) => t.sendEmail(p.msg, p.smtp));
    });
  });
});
