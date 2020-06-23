import { IZEmailContact } from './email-contact.interface';

/**
 * Represents an email envelope of information about who the email is from and where it's going to.
 */
export interface IZEmailEnvelope {
  /**
   * Who the email is from.
   *
   * This can be the full contact or just the address.
   */
  from: IZEmailContact | string;

  /**
   * Where the email is going.
   *
   * This can be falsy if cc is filled out.
   */
  to?: Array<IZEmailContact | string>;

  /**
   * Who is receiving a carbon copy of the email.
   *
   * This can be falsy if to is filled out.
   */
  cc?: Array<IZEmailContact | string>;

  /**
   * Who is receiving a blind carbon copy of an email.
   */
  bcc?: Array<IZEmailContact | string>;
}
