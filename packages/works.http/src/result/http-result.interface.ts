import { ZHttpCode } from './http-code.type';

/**
 * Represents a result from an http request.
 */
export interface IZHttpResult<TResult = any> {
  /**
   * The status code.
   */
  status: ZHttpCode;

  /**
   * The set of headers that was returned.
   */
  headers: Record<string, string>;

  /**
   * The actual body result of the invocation.
   */
  data: TResult;
}
