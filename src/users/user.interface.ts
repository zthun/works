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
   * The password for the user.
   *
   * Should only be sent from users and should only be stored in a hashed fashion.
   * If this was a hashed password, then the salt should be set as well.
   */
  password?: string;

  /**
   * The salt used to hash the password.
   */
  salt?: string;
}
