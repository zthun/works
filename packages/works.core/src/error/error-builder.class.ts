import { IZError } from './error.interface';

/**
 * Represents an object used to build up an IZError object.
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
