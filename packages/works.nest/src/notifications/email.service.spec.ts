import { IZEmail, IZEmailEnvelope, IZServer, ZEmailBuilder, ZEmailEnvelopeBuilder, ZServerBuilder } from '@zthun/works.core';
import { createSpyObj } from 'jest-createspyobj';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ZEmailService } from './email.service';

jest.mock('nodemailer');

describe('ZEmailService', () => {
  let createTransportSpy: jest.Mock;
  let mail: jest.Mocked<Mail>;

  function createTestTarget() {
    return new ZEmailService();
  }

  beforeEach(() => {
    mail = createSpyObj(Mail, ['sendMail']);
    mail.sendMail.mockReturnValue(Promise.resolve({}));

    createTransportSpy = createTransport as jest.Mock;
    createTransportSpy.mockClear();
    createTransportSpy.mockReturnValue(mail);
  });

  describe('Sending', () => {
    let server: IZServer;
    let email: IZEmail;
    let envelope: IZEmailEnvelope;

    beforeEach(() => {
      server = new ZServerBuilder().address('smtp.zthunworks.com').port(25).build();
      envelope = new ZEmailEnvelopeBuilder().from('x@marvel.com').to('xmen@marvel.com').bcc('avengers@marvel.com').build();
      email = new ZEmailBuilder().envelope(envelope).subject('Mission Briefing').message('<p>See attached document for mission briefing.</p>').build();
    });

    it('should send the email message.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = { from: envelope.from, to: envelope.to[0], cc: undefined, bcc: envelope.bcc[0], subject: email.subject, html: email.message };
      // Act
      await target.send(email, server);
      // Assert
      expect(mail.sendMail).toHaveBeenCalledWith(jasmine.objectContaining(expected));
    });

    it('should send with the correct smtp server.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = { host: server.address, port: server.port, auth: undefined };
      // Act
      await target.send(email, server);
      // Assert
      expect(createTransportSpy).toHaveBeenCalledWith(jasmine.objectContaining(expected));
    });

    it('should send with the correct smtp server credentials.', async () => {
      // Arrange
      const target = createTestTarget();
      const user = 'user';
      const pass = 'pass';
      const expected = { host: server.address, port: server.port, auth: { user, pass } };
      server = new ZServerBuilder().copy(server).username(user).password(pass).build();
      // Act
      await target.send(email, server);
      // Assert
      expect(createTransportSpy).toHaveBeenCalledWith(jasmine.objectContaining(expected));
    });

    it('should default to port 587 if no port is supplied.', async () => {
      // Arrange
      const target = createTestTarget();
      const expected = { host: server.address, port: 587 };
      server = new ZServerBuilder().address(server.address).build();
      // Act
      await target.send(email, server);
      // Assert
      expect(createTransportSpy).toHaveBeenCalledWith(jasmine.objectContaining(expected));
    });
  });
});
