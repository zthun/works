/**
 * Represents an error return object from a web rest service.
 */
export interface IZError {
  /**
   * The error message in english.
   *
   * You can always use this directly for debugging purposes, but
   * it is better to display a localized error message using
   * the error code and sub code.
   */
  english?: string;

  /**
   * The error type.
   *
   * Basically the exception name.
   */
  type?: string;

  /**
   * The error code.  Used for localization of the english error.
   */
  code: number;

  /**
   * An optional sub code that further describes the error that occurred.
   *
   * This is useful if your error code uses http error codes and you want
   * additional information about what has happened.
   */
  subCode?: number;
}
