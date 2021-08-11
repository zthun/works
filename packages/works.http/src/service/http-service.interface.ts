import { IZHttpRequest } from '../request/http-request.interface';
import { IZHttpResult } from '../result/http-result.interface';

/**
 * Represents a service that makes http invocations.
 */
export interface IZHttpService {
  /**
   * Makes the request.
   *
   * @param req The request object to make.
   *
   * @returns A promise that resolves the request if a 200 code is returned, or
   *          rejects if a 400 or 500 code is returned.  The request is
   *          rerouted if a 300 code is returned.
   */
  request<TResult = any, TBody = any>(req: IZHttpRequest<TBody>): Promise<IZHttpResult<TResult>>;
}
