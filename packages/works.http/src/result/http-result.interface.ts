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

  /**
   * The redirection url in the case that status is 300.
   *
   * This is normally handled for you internally and you don't
   * really ever have to worry about it.
   */
  url?: string;
}
