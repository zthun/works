/**
 * Represents a user in the system.
 */
export interface IZUser<TMeta = any> {
  /**
   * The user id.
   */
  _id: string;

  /**
   * The users email.  This must be unique.
   */
  email: string;

  /**
   * The hashed password for the user.
   */
  password?: string;

  /**
   * Gets a value that indicates whether or not the user is the super user.
   */
  super?: boolean;

  /**
   * The last time the user logged into the system.
   *
   * This is a utc timestamp.  If this is falsy,
   * then the user has never logged in.
   *
   * If this number is greater than or equal to
   * the logout number, then the user is currently marked
   * as logged in and any an all tokens should be valid.
   */
  login?: number;

  /**
   * The last time the user logged out of the system.
   *
   * This is a utc timestamp.  If this is falsy, then
   * the user has never logged out.
   *
   * If this number is greater than the login, then
   * the user is currently logged our and has never
   * logged in.
   */
  logout?: number;

  /**
   * Optional metadata about the user.
   *
   * This is determined by the needs of the application using this
   * system.
   */
  metadata?: TMeta;
}
