/**
 * Represents information about a url.
 */
export interface IZUrlInfo {
  /**
   * The protocol for the url.
   */
  protocol: string;

  /**
   * The username.
   */
  username: string;

  /**
   * The password.
   */
  password: string;

  /**
   * The host.
   */
  hostname: string;

  /**
   * The port number.
   */
  port: number;

  /**
   * A list of current paths.
   *
   * You can always get the full path using
   * path.join('/')
   */
  path: string[];

  /**
   * The client side hash route.
   */
  hash: string;

  /**
   * The key value params.
   */
  params: Array<{ key: string; val: string }>;
}
