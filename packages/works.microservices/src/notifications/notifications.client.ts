import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IZEmail, IZServer } from '@zthun/works.core';
import { lastValueFrom } from 'rxjs';

@Injectable()
/**
 * Represents a service to send emails.
 */
export class ZNotificationsClient {
  /**
   * Initializes a new instance of this object.
   *
   * @param _notifications The client proxy to access the microservice over transport.
   */
  public constructor(@Inject('Users.Service') private readonly _notifications: ClientProxy) {}
  /**
   * Sends an email message.
   *
   * @param msg The message to send.
   * @param smtp The smtp server to use when sending the message.
   *
   * @returns A promise that, when resolved has sent the mail.  Returns a rejected promise if
   *          the send fails.
   */
  public async sendEmail(msg: IZEmail, smtp: IZServer): Promise<null> {
    return lastValueFrom(this._notifications.send({ cmd: 'sendEmail' }, { msg, smtp }));
  }
}
