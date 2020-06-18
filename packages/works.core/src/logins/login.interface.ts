/**
 * Represents a login to the system.
 *
 * This is used for creating and posting tokens.  This object is non storable.
 */
export interface IZLogin {
  /**
   * The login email.
   */
  email: string;

  /**
   * The login password.
   */
  password: string;

  /**
   * The password confirmation.
   *
   * Required when creating a user or updating a user.
   */
  confirm?: string;
}
