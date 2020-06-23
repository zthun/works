import { IZEmailEnvelope } from './email-envelope.interface';

/**
 * Represents an email message.
 */
export interface IZEmail {
  /**
   * The email envelope of where the email is going to.
   */
  envelope: IZEmailEnvelope;

  /**
   * The subject (title) of the email.
   */
  subject?: string;

  /**
   * The message to send.
   */
  message?: string;
}
