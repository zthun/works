import axios from 'axios';
import { IZHttpRequest } from '../request/http-request.interface';
import { ZHttpResultBuilder } from '../result/http-result-builder.class';
import { IZHttpResult } from '../result/http-result.interface';
import { IZHttpService } from './http-service.interface';

/**
 * Represents an axios based implementation of the http service.
 */
export class ZHttpService implements IZHttpService {
  /**
   * Invokes the request with a real http service.
   *
   * @param req The request information to make.
   */
  public async request<TResult = any, TBody = any>(req: IZHttpRequest<TBody>): Promise<IZHttpResult<TResult>> {
    try {
      const res = await axios({
        url: req.url,
        method: req.method,
        data: req.body,
        timeout: req.timeout,
        headers: req.headers
      });
      return new ZHttpResultBuilder().data(res.data).headers(res.headers).status(res.status).build();
    } catch (err) {
      return Promise.reject(new ZHttpResultBuilder().data(err.data).headers(err.headers).status(err.status).build());
    }
  }
}
