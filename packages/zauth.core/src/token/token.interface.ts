import { IZIdentifiable } from '../common/identifiable.interface';

/**
 * Represents an auth token.
 */
export interface IZToken extends IZIdentifiable {
  /**
   * The expiration date of the token.
   */
  exp: Date | string;
  /**
   * The user id the token belongs to.
   */
  userId?: string;
}
