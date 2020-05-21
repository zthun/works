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
  public build(): IZConfigEntry {
    this._entry._id = `${this._entry.scope}.${this._entry.key}`;
    return { ...this._entry };
  }
}
