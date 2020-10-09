import { IZEmailContact } from './email-contact.interface';
import { IZEmailEnvelope } from './email-envelope.interface';

/**
 * Represents a builder for an email envelope.
 */
export class ZEmailEnvelopeBuilder {
  private _envelope: IZEmailEnvelope;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._envelope = {
      from: null
    };
  }

  /**
   * Sets the from field.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public from(val: IZEmailContact | string): this {
    this._envelope.from = val;
    return this;
  }

  /**
   * Adds a value to the 'to' field.
   *
   * @param val The value to add.
   *
   * @returns This object.
   */
  public to(val: IZEmailContact | string): this {
    this._envelope.to = this._envelope.to || [];
    this._envelope.to.push(val);
    return this;
  }

  /**
   * Sets the to field.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public tos(val: Array<IZEmailContact | string>): this {
    this._envelope.to = val;
    return this;
  }

  /**
   * Adds a value to the cc field.
   *
   * @param val The value to add.
   *
   * @returns This object.
   */
  public cc(val: IZEmailContact | string): this {
    this._envelope.cc = this._envelope.cc || [];
    this._envelope.cc.push(val);
    return this;
  }

  /**
   * Sets the cc field.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public ccs(val: Array<IZEmailContact | string>): this {
    this._envelope.cc = val;
    return this;
  }

  /**
   * Adds a value to the bcc field.
   *
   * @param val The value to add.
   *
   * @returns This object.
   */
  public bcc(val: IZEmailContact | string): this {
    this._envelope.bcc = this._envelope.bcc || [];
    this._envelope.bcc.push(val);
    return this;
  }

  /**
   * Sets the bcc field.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public bccs(val: Array<IZEmailContact | string>): this {
    this._envelope.bcc = val;
    return this;
  }

  /**
   * Assigns another partial email envelope to this object.
   *
   * @param other The value to partial copy.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZEmailEnvelope>): this {
    this._envelope = Object.assign({}, this._envelope, other);
    this._envelope = JSON.parse(JSON.stringify(this._envelope));
    return this;
  }

  /**
   * Copies another email envelope to this object.
   *
   * @param other The value to copy.
   *
   * @returns This object.
   */
  public copy(other: IZEmailEnvelope): this {
    this._envelope = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns a copy of the built envelope.
   *
   * @returns A copy of the currently built up envelope object.
   */
  public build(): IZEmailEnvelope {
    return JSON.parse(JSON.stringify(this._envelope));
  }
}
