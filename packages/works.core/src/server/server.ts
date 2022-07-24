/**
 * Represents an abstract server connection.
 */
export interface IZServer {
  /**
   * The host or ip address to connect to.
   *
   * Does not distinguish between the protocol and hostname.
   */
  address: string;

  /**
   * The optional port to connect on.
   *
   * If this is falsy, then it is up to the implementation
   * taking this object to properly default the value.
   */
  port?: number;

  /**
   * The optional username.
   *
   * Falsy usually implies guest access.
   */
  username?: string;

  /**
   * The user's password to connect with.
   *
   * If username is not supplied, then this generally has no meaning.
   */
  password?: string;
}

/**
 * Represents a builder for a server object.
 */
export class ZServerBuilder {
  private _server: IZServer;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._server = {
      address: ''
    };
  }

  /**
   * The server ip address or hostname.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public address(val: string): this {
    this._server.address = val;
    return this;
  }

  /**
   * Sets the optional port to connect on.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public port(val: number): this {
    this._server.port = val;
    return this;
  }

  /**
   * Sets the optional username to connect on.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public username(val: string): this {
    this._server.username = val;
    return this;
  }

  /**
   * Sets the password to connect on.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public password(val: string): this {
    this._server.password = val;
    return this;
  }

  /**
   * Assigns all truthy properties in other to this object.
   *
   * @param other The server object to copy.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZServer>): this {
    this._server = Object.assign({}, this._server, other);
    return this;
  }

  /**
   * Copies all properties in other to this object.
   *
   * @param other The server object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZServer): this {
    this._server = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns a copy of the built object.
   *
   * @returns A copy of the built object.
   */
  public build(): IZServer {
    return JSON.parse(JSON.stringify(this._server));
  }
}
