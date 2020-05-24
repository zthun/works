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
   * The current password for the user.
   */
  password?: string;

  /**
   * The new password to update.
   */
  newPassword?: string;

  /**
   * The password confirmation if the password is to change.
   *
   * This should match the newPassword property.
   */
  confirm?: string;

  /**
   * True if the profile belongs to a super user.  False otherwise.
   */
  super?: boolean;
}
