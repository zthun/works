/**
 * Represents an auth token.
 */
export interface IZToken {
  /**
   * The token id / bearer auth.
   */
  _id: string;
  /**
   * The expiration date of the token.
   */
  exp: Date | string;
  /**
   * The user id the token belongs to.
   */
  userId?: string;
}
