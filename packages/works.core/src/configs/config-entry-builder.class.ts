import { randomBytes } from 'crypto';
import { IZConfigEntry } from './config-entry.interface';

/**
 * Represents a builder for a configuration entry point.
 */
export class ZConfigEntryBuilder<T = any> {
  private _entry: IZConfigEntry<T>;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._entry = {
      _id: null,
      scope: '',
      key: '',
      value: null
    };
  }

  /**
   * The scope of the configuration entry.
   *
   * @param val The val to set.
   *
   * @returns This object.
   */
  public scope(val: string): this {
    this._entry.scope = val;
    return this;
  }

  /**
   * Sets the key value.
   *
   * @param val The val to set.
   *
   * @returns This object.
   */
  public key(val: string): this {
    this._entry.key = val;
    return this;
  }

  /**
   * Sets the value.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public value(val: T): this {
    this._entry.value = val;
    return this;
  }

  /**
   * Generates a value of a specified length and returns the new builder.
   *
   * @param length The length of the random byte array.  For secrets, the longer the better.
   * @param encoding The way to encode the byte array to a string.
   *
   * @returns A new entry builder that has a string value.
   */
  public generate(length = 128, encoding: BufferEncoding = 'base64'): ZConfigEntryBuilder<string> {
    const val = randomBytes(length).toString(encoding);
    return new ZConfigEntryBuilder<string>().scope(this._entry.scope).key(this._entry.key).value(val);
  }

  /**
   * Assigns values from another config entry to this object.
   *
   * @param other The config entry to partially copy.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZConfigEntry>): this {
    this._entry = Object.assign({}, this._entry, other);
    return this;
  }

  /**
   * Copies another config entry.
   *
   * @param other The object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZConfigEntry): this {
    this._entry = Object.assign(this._entry, other);
    return this;
  }

  /**
   * Returns the built object.
   *
   * @returns The built entry object.
   */
  public build(): IZConfigEntry<T> {
    this._entry._id = `${this._entry.scope}.${this._entry.key}`;
    return { ...this._entry };
  }
}
