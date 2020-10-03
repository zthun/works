/**
 * Represents a user in the system.
 *
 * This is a storable version of the user and contains all information needed for
 * login and profile management.
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
   *
   * This should always be stored encrypted.
   */
  password: string;

  /**
   * The optional recovery password that is auto generated for the user.
   *
   * This is a temporary password that has an expiration date.
   */
  recovery?: { password: string; exp: number };

  /**
   * The users display name.
   *
   * If this is falsy, then the email should be used as the display name.
   */
  display?: string;

  /**
   * A one time activator password that the user will use to activate their account.
   *
   * This will be in the url and they won't need to stored once the user has been activated.
   * This should never be sent back with the profile information.
   */
  activator?: { key: string; exp: number };

  /**
   * Gets a value that indicates whether or not the user is the super user.
   *
   * The super user cannot be deleted.
   */
  super?: boolean;

  /**
   * A timestamp of the last time the user logged in.
   */
  login?: number;

  /**
   * The url to the users avatar.
   *
   * This can be a data url or a url to a public image.
   */
  avatar?: string;
}
