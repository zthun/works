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
   * Optional metadata about the user.
   *
   * This is determined by the needs of the application using this
   * system.
   */
  metadata?: TMeta;
}
