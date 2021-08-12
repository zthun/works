import { ZHttpCodeSuccess } from './http-code-success.enum';
import { ZHttpCode } from './http-code.type';
import { IZHttpResult } from './http-result.interface';

/**
 * Represents a builder for an IZHttpResult class.
 */
export class ZHttpResultBuilder<TData = any> {
  private _result: IZHttpResult<TData>;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._result = {
      status: ZHttpCodeSuccess.OK,
      data: null,
      headers: {}
    };
  }

  /**
   * Sets the data.
   *
   * @param data The data to set.
   *
   * @returns This object.
   */
  public data(data: TData): this {
    this._result.data = data;
    return this;
  }

  /**
   * Sets the status code and the english description.
   *
   * @param code The code to set.
   *
   * @returns This object.
   */
  public status(code: ZHttpCode): this {
    this._result.status = code;
    return this;
  }

  /**
   * Sets the return headers.
   *
   * @param headers The headers to set.
   *
   * @returns This object.
   */
  public headers(headers: Record<string, string>): this {
    this._result.headers = headers;
    return this;
  }

  /**
   * Returns the built up result.
   *
   * @returns A shallow copy of the built up result.
   */
  public build() {
    return JSON.parse(JSON.stringify(this._result));
  }
}
