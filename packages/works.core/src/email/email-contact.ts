/**
 * Represents an email contact.
 */
export interface IZEmailContact {
  /**
   * The email address of the contact.
   */
  address: string;

  /**
   * The type of contact.
   *
   * This can be anything you want.  In the end, this has no bearing
   * on the final sent message.  It's just a descriptor to determine what this contact
   * represents if needed.
   */
  type?: string;

  /**
   * The display name of the contact.
   *
   * If this is falsy, then you can consider the
   * address as the display.
   */
  display?: string;
}

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
      address: ''
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
    this._contact = JSON.parse(JSON.stringify(this._contact));
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
    this._contact = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns a copy of the built object.
   *
   * @returns A copy of the built email contact.
   */
  public build(): IZEmailContact {
    return JSON.parse(JSON.stringify(this._contact));
  }
}
