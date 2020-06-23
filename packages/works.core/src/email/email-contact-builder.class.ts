import { IZEmailContact } from './email-contact.interface';

/**
 * Represents a builder for an email contact.
 */
export class ZEmailContactBuilder {
  private _contact: IZEmailContact;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._contact = {
      address: null
    };
  }

  /**
   * Sets the address of the contact.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public address(val: string): this {
    this._contact.address = val;
    return this;
  }

  /**
   * Sets the type of the contact.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public type(val: string): this {
    this._contact.type = val;
    return this;
  }

  /**
   * Sets the display of the contact.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public display(val: string) {
    this._contact.display = val;
    return this;
  }

  /**
   * Assigns the values in other to this object.
   *
   * @param other The value to partial copy.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZEmailContact>): this {
    this._contact = Object.assign({}, this._contact, other);
    return this;
  }

  /**
   * Copies another object.
   *
   * @param other The value to copy.
   *
   * @returns This object.
   */
  public copy(other: IZEmailContact): this {
    this._contact = Object.assign(this._contact, other);
    return this;
  }

  /**
   * Returns a copy of the built object.
   */
  public build(): IZEmailContact {
    return { ...this._contact };
  }
}
