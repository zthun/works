/**
 * Represents a non storable login.
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
