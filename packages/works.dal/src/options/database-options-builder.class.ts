import { IZDatabaseOptions } from './database-options.interface';

/**
 * Represents an object that can be used to build a database options object.
 */
export class ZDatabaseOptionsBuilder {
  private _options: IZDatabaseOptions;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._options = {
      database: ''
    };
  }

  /**
   * Sets the database to connect to.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public database(val: string): this {
    this._options.database = val;
    return this;
  }

  /**
   * Sets the host to connect to.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public host(val: string): this {
    this._options.host = val;
    return this;
  }

  /**
   * Sets the protocol to connect to.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public protocol(val: string): this {
    this._options.protocol = val;
    return this;
  }

  /**
   * Sets the port to connect on.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public port(val: number): this {
    this._options.port = val;
    return this;
  }

  /**
   * Sets the credentials for connecting to the database.
   *
   * @param user The user name.
   * @param pass The password.
   *
   * @returns This object.
   */
  public credentials(user: string, pass: string): this {
    this._options.user = user;
    this._options.password = pass;
    return this;
  }

  /**
   * Sets the timeout.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public timeout(val: number): this {
    this._options.timeout = val;
    return this;
  }

  /**
   * Assigns values from a subset of database options to this object.
   *
   * @param other The partial object to assign values from.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZDatabaseOptions>): this {
    this._options = Object.assign(this._options, other);
    return this;
  }

  /**
   * Copies values from another database options structure to this object.
   *
   * @param other The object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZDatabaseOptions): this {
    this._options = Object.assign({}, other);
    return this;
  }

  /**
   * Builds the options.
   *
   * @returns A copy of the current options structure.
   */
  public build(): IZDatabaseOptions {
    return { ...this._options };
  }
}
