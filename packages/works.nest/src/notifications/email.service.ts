import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { IZEmail, IZServer, ZEmailContactAddressBuilder } from '@zthun/works.core';
import { createTransport, SendMailOptions } from 'nodemailer';

@Injectable()
/**
 * Represents a service to send emails.
 */
export class ZEmailService {
  /**
   * Sends an email message.
   *
   * @param msg The message to send.
   * @param smtp The smtp server to use when sending the message.
   *
   * @returns A promise that, when resolved has sent the mail.  Returns a rejected promise if
   *          the send fails.
   */
  public async send(msg: IZEmail, smtp: IZServer): Promise<void> {
    const auth =
      smtp.username || smtp.password
        ? {
            user: smtp.username,
            pass: smtp.password
          }
        : undefined;
    const port = smtp.port || 587;

    const transport = createTransport({
      host: smtp.address,
      port,
      auth
    });

    const from = new ZEmailContactAddressBuilder().address(msg.envelope.from).build();
    const to = new ZEmailContactAddressBuilder().addresses(msg.envelope.to).build();
    const cc = new ZEmailContactAddressBuilder().addresses(msg.envelope.cc).build();
    const bcc = new ZEmailContactAddressBuilder().addresses(msg.envelope.bcc).build();
    const subject = msg.subject;
    const html = msg.message;

    const mail: SendMailOptions = { from, to, cc, bcc, subject, html };

    try {
      await transport.sendMail(mail);
    } catch {
      return Promise.reject(new ServiceUnavailableException('The email server is currently not available.  You will need to try this again later.'));
    }
  }
}
