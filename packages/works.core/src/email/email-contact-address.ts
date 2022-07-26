import { IZEmailContact } from './email-contact';

/**
 * Represents a builder that will build a comma separated list of addresses for an email message.
 */
export class ZEmailContactAddressBuilder {
  private _addresses: Array<string | IZEmailContact> = [];
  private _delimiter = ', ';

  /**
   * Adds an address to the list to builder.
   *
   * @param val The address to add.
   *
   * This can be the empty string, null, or undefined.
   *
   * @returns This object.
   */
  public address(val: string | IZEmailContact): this {
    this._addresses.push(val);
    return this;
  }

  /**
   * Sets the addresses to build from.
   *
   * @param val The address to set.
   *
   * @returns This object.
   */
  public addresses(val: Array<string | IZEmailContact>) {
    this._addresses = val.slice();
    return this;
  }

  /**
   * Sets the delimiter to split the addresses with.
   *
   * The default is a comma with a space.
   *
   * @param val The delimiter to set.
   *
   * @returns This object.
   */
  public delimiter(val: string): this {
    this._delimiter = val;
    return this;
  }

  /**
   * Builds the delimiters separated list of addresses.
   *
   * @returns The delimited separated list of addresses.
   */
  public build(): string {
    const addr = (ct: string | IZEmailContact) => {
      if (!ct) {
        return undefined;
      }

      return typeof ct === 'string' ? ct : ct.address;
    };

    const truthy = (ct: string) => {
      return !!ct;
    };

    return this._addresses.map(addr).filter(truthy).join(this._delimiter);
  }
}
