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
   * Required on a create or update.
   */
  confirm?: string;
}
