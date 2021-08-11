import { ZHttpMethod } from './http-method.enum';

/**
 * Represents a http request.
 */
export interface IZHttpRequest<TBody = any> {
  /**
   * The method, or verb, to invoke the request with.
   */
  method: ZHttpMethod;

  /**
   * The url to target.
   *
   * You can use the @zthun/works.url package to
   * easily construct urls.
   */
  url: string;

  /**
   * The post body.
   *
   * Only should really be used for POST style
   * calls which accept a body.
   */
  body?: TBody;

  /**
   * Request headers.
   */
  headers?: Record<string, string>;

  /**
   * The timeout before the rest method fails
   */
  timeout?: number;
}
