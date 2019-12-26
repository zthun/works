import { IZIdentifiable } from '../common/identifiable.interface';

/**
 * Represents a user in the system.
 */
export interface IZUser<TMeta = any> extends IZIdentifiable {
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

  /**
   * Optional metadata about the user.
   *
   * This is determined by the needs of the application using this
   * system.
   */
  metadata?: TMeta;
}
