/* eslint-disable require-jsdoc */
import { IZEmail, IZEmailEnvelope, IZServer, ZEmailBuilder, ZEmailEnvelopeBuilder, ZServerBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ZNotificationsService } from './notifications.service';

jest.mock('nodemailer');

describe('ZNotificationsService', () => {
  let createTransportSpy: jest.Mock;
  let mail: jest.Mocked<Mail>;

  function createTestTarget() {
    return new ZNotificationsService();
  }

  describe('Emails', () => {
    let smtp: IZServer;
    let msg: IZEmail;
    let envelope: IZEmailEnvelope;

    beforeEach(() => {
      mail = createMocked(['sendMail']);
      mail.sendMail.mockReturnValue(Promise.resolve({}));

      createTransportSpy = createTransport as jest.Mock;
      createTransportSpy.mockClear();
      createTransportSpy.mockReturnValue(mail);
    });

    beforeEach(() => {
      smtp = new ZServerBuilder().address('smtp.zthunworks.com').port(25).build();
      envelope = new ZEmailEnvelopeBuilder().from('x@marvel.com').to('xmen@marvel.com').bcc('avengers@marvel.com').build();
      msg = new ZEmailBuilder().envelope(envelope).subject('Mission Briefing').message('<p>See attached document for mission briefing.</p>').build();
    });

    it('should send the email message.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = { from: envelope.from, to: envelope.to[0], cc: undefined, bcc: envelope.bcc[0], subject: msg.subject, html: msg.message };
      // Act
      await target.sendEmail({ msg, smtp });
      // Assert
      expect(mail.sendMail).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('should return null upon success.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.sendEmail({ msg, smtp });
      // Assert
      expect(actual).toBeNull();
    });

    it('should send with the correct smtp server.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = { host: smtp.address, port: smtp.port, auth: undefined };
      // Act
      await target.sendEmail({ msg, smtp });
      // Assert
      expect(createTransportSpy).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('should send with the correct smtp server credentials.', async () => {
      // Arrange
      const target = createTestTarget();
      const user = 'user';
      const pass = 'pass';
      const expected = { host: smtp.address, port: smtp.port, auth: { user, pass } };
      smtp = new ZServerBuilder().copy(smtp).username(user).password(pass).build();
      // Act
      await target.sendEmail({ msg, smtp });
      // Assert
      expect(createTransportSpy).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('should default to port 587 if no port is supplied.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = { host: smtp.address, port: 587 };
      smtp = new ZServerBuilder().address(smtp.address).build();
      // Act
      await target.sendEmail({ msg, smtp });
      // Assert
      expect(createTransportSpy).toHaveBeenCalledWith(expect.objectContaining(expected));
    });

    it('should reject with an error 503 if the email server is not available.', async () => {
      // Arrange
      const target = createTestTarget();
      mail.sendMail.mockRejectedValue('server not found');
      // Act
      const actual = target.sendEmail({ msg, smtp });
      // Assert
      await expect(actual).rejects.toEqual(expect.objectContaining({ status: 503 }));
    });
  });
});
