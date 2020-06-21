/**
 * Represents an object that can be used to update various fields of a user.
 */
export interface IZProfile {
  /**
   * The user email.
   */
  email?: string;

  /**
   * The display name of the user.
   */
  display?: string;

  /**
   * The password to update to.
   *
   * This should never be returned to the user.  It is here
   * to allow the user to update his or her password.
   */
  password?: string;

  /**
   * The password confirmation if the password is to change.
   *
   * This should match the password property if it is to be updated and
   * must never be sent back to any client.
   */
  confirm?: string;

  /**
   * True if the profile belongs to a super user.  False otherwise.
   *
   * This cannot be set.  It is only to confirm if the user is the super user.
   */
  super?: boolean;
}
