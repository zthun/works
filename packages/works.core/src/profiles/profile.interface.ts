/**
 * Represents an object that can be used to update various fields of a user.
 */
export interface IZProfile {
  /**
   * The user email.
   *
   * This should always be sent back when the user
   * requests their profile information, but can
   * be empty when updating meaning that the user
   * does not want to change their email.
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
   * A value that indicates if the profile has been activated.
   *
   * This should always be sent back when the user requests their
   * profile (for better UI experience), but, like the super flag,
   * cannot be set.
   */
  active?: boolean;

  /**
   * A url to an avatar.
   */
  avatar?: string;
}
