import { ZHttpMethod } from '../request/http-method.enum';
import { ZHttpRequestBuilder } from '../request/http-request-builder.class';
import { IZHttpRequest } from '../request/http-request.interface';
import { ZHttpCodeClient } from '../result/http-code-client.enum';
import { ZHttpResultBuilder } from '../result/http-result-builder.class';
import { IZHttpResult } from '../result/http-result.interface';
import { IZHttpService } from './http-service.interface';

/**
 * Represents a mock http service that can be useful for demos,
 * testing, and pre-api implementations.
 */
export class ZHttpServiceMock implements IZHttpService {
  private _mapping: {
    [endpoint: string]: {
      [verb: string]: (req: IZHttpRequest) => IZHttpResult | Promise<IZHttpResult>;
    };
  } = {};

  /**
   * Sets the result of a given endpoint.
   *
   * @param endpoint The endpoint to set.
   * @param verb The endpoint verb to respond to.
   * @param invoke The result method.  If this is falsy, then the endpoint is removed.
   */
  public set<TResult = any>(endpoint: string, verb: ZHttpMethod, invoke: (req: IZHttpRequest) => IZHttpResult<TResult> | Promise<IZHttpResult<TResult>>) {
    this._mapping[endpoint] = this._mapping[endpoint] || {};
    this._mapping[endpoint][verb] = invoke;
  }

  /**
   * Invokes the request given the allowed api implementations.
   *
   * @param req The request that has been made.
   *
   * @returns A promise that resolves with the given result if the status code is less than 400.
   *          Any status code above 400 will result in a rejected promise.
   */
  public async request<TResult = any, TBody = any>(req: IZHttpRequest<TBody>): Promise<IZHttpResult<TResult>> {
    const endpointConfig = this._mapping[req.url];
    const result = endpointConfig?.[req.method];
    const errorThreshold = 400;
    const redirectThreshold = 300;
    const notFound = new ZHttpResultBuilder().data(null).status(ZHttpCodeClient.NotFound).build();

    if (result == null) {
      return Promise.reject(notFound);
    }

    const intermediate = await result(req);

    if (intermediate.status >= redirectThreshold && intermediate.status < errorThreshold) {
      return this.request(new ZHttpRequestBuilder().copy(req).url(intermediate.url).build());
    }

    return +intermediate.status < errorThreshold ? Promise.resolve(intermediate) : Promise.reject(intermediate);
  }
}
