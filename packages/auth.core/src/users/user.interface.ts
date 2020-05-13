import { IZIdentifiable } from '../common/identifiable.interface';

/**
 * Represents a user in the system.
 */
export interface IZUser extends IZIdentifiable {
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
}
