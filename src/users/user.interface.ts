/**
 * Represents a user in the system.
 */
export interface IZUser {
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
}
