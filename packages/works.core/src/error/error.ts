/**
 * Represents an error return object from a web rest service.
 *
 * @deprecated Use the version in works.error instead.
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

/**
 * Represents an object used to build up an IZError object.
 *
 * @deprecated Use the version in works.error instead.
 */
export class ZErrorBuilder {
  private _error: IZError;

  /**
   * Initializes a new instance of this object.
   *
   * @param code The error code.
   */
  public constructor(code: number) {
    this._error = { code };
  }

  /**
   * Sets the optional sub code.
   *
   * @param code The sub code.
   *
   * @returns This object.
   */
  public sub(code: number): this {
    this._error.subCode = code;
    return this;
  }

  /**
   * Sets the error type.
   *
   * @param type The type of error.
   *
   * @returns This object.
   */
  public type(type: string): this {
    this._error.type = type;
    return this;
  }

  /**
   * Sets the english error message.
   *
   * @param  msg The english error message.
   *
   * @returns This object.
   */
  public english(msg: string): this {
    this._error.english = msg;
    return this;
  }

  /**
   * Returns the error object.
   *
   * @returns The error object.
   */
  public build(): IZError {
    return { ...this._error };
  }
}
