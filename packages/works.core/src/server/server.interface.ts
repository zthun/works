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
