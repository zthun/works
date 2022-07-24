import { IZEmailEnvelope, ZEmailEnvelopeBuilder } from './email-envelope';

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

/**
 * Represents a builder for an email.
 */
export class ZEmailBuilder {
  private _email: IZEmail;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._email = {
      envelope: new ZEmailEnvelopeBuilder().build()
    };
  }

  /**
   * Sets the envelope of where the email is going.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public envelope(val: IZEmailEnvelope): this {
    this._email.envelope = val;
    return this;
  }

  /**
   * Sets the subject line of the email.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public subject(val: string): this {
    this._email.subject = val;
    return this;
  }

  /**
   * Sets the message of the email.
   *
   * The message can be raw text or html.
   *
   * @param val A html enabled formatted message to set.
   *
   * @returns This object.
   */
  public message(val: string): this {
    this._email.message = val;
    return this;
  }

  /**
   * Assigns the other object to the current email object.
   *
   * @param other The object to copy.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZEmail>): this {
    this._email = Object.assign(this._email, other);
    this._email = JSON.parse(JSON.stringify(this._email));
    return this;
  }

  /**
   * Copies another email into the builder.
   *
   * @param other The object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZEmail) {
    this._email = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns a copy of the built object.
   *
   * @returns A copy of the built object.
   */
  public build(): IZEmail {
    return JSON.parse(JSON.stringify(this._email));
  }
}
