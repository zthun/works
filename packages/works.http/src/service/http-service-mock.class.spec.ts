/* eslint-disable require-jsdoc */
import { ZHttpMethod } from '../request/http-method.enum';
import { ZHttpRequestBuilder } from '../request/http-request-builder.class';
import { IZHttpRequest } from '../request/http-request.interface';
import { ZHttpCodeClient } from '../result/http-code-client.enum';
import { ZHttpCodeInformationalResponse } from '../result/http-code-informational-response.enum';
import { ZHttpCodeRedirection } from '../result/http-code-redirection.enum';
import { ZHttpCodeServer } from '../result/http-code-server.enum';
import { ZHttpCodeSuccess } from '../result/http-code-success.enum';
import { ZHttpCode } from '../result/http-code.type';
import { ZHttpResultBuilder } from '../result/http-result-builder.class';
import { IZHttpResult } from '../result/http-result.interface';
import { ZHttpServiceMock } from './http-service-mock.class';

describe('ZHttpServiceMock', () => {
  function createTestTarget() {
    return new ZHttpServiceMock();
  }

  describe('Resolving and Rejecting by Status', () => {
    let endpoint: string;
    let data: any;

    beforeEach(() => {
      endpoint = 'https://zthunworks.com/api/objects';
      data = { value: 100 };
    });

    async function assertCompletes(requestFn: (t: ZHttpServiceMock, r: IZHttpRequest) => Promise<IZHttpResult>, code: ZHttpCode) {
      // Arrange
      const target = createTestTarget();
      const expected = new ZHttpResultBuilder().data(data).status(code).build();
      target.set(endpoint, ZHttpMethod.Get, () => expected);
      const req = new ZHttpRequestBuilder().get().url(endpoint).build();
      // Act
      const actual = await requestFn(target, req);
      // Assert
      expect(actual).toEqual(expected);
    }

    const assertResolvesRequest: (code: ZHttpCode) => Promise<void> = assertCompletes.bind(null, (t: ZHttpServiceMock, r: IZHttpRequest) => t.request(r));
    const assertRejectsRequest: (code: ZHttpCode) => Promise<void> = assertCompletes.bind(null, (t: ZHttpServiceMock, r: IZHttpRequest) => t.request(r).catch((e) => Promise.resolve(e)));

    it('should return a resolved promise for code 100.', async () => {
      await assertResolvesRequest(ZHttpCodeInformationalResponse.EarlyHints);
    });

    it('should return a resolved promise for code 200.', async () => {
      await assertResolvesRequest(ZHttpCodeSuccess.Accepted);
    });

    it('should return a rejected promise for code 400.', async () => {
      await assertRejectsRequest(ZHttpCodeClient.BadRequest);
    });

    it('should return a rejected promise for code 500.', async () => {
      await assertRejectsRequest(ZHttpCodeServer.InsufficientStorage);
    });
  });

  describe('Redirecting', () => {
    let data: any;
    let endpointRedirect: string;
    let endpointPermanent: string;

    function createRedirectedTarget() {
      const target = createTestTarget();
      target.set(endpointRedirect, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(ZHttpCodeRedirection.Found).redirect(endpointPermanent).build());
      target.set(endpointPermanent, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(ZHttpCodeSuccess.OK).data(data).build());
      return target;
    }

    beforeEach(() => {
      data = { value: 10 };
      endpointRedirect = 'https://zthunworks.com/api/from';
      endpointPermanent = 'https://zthunworks.com/api/to';
    });

    it('should redirect the correct data.', async () => {
      // Arrange
      const target = createRedirectedTarget();
      const req = new ZHttpRequestBuilder().url(endpointRedirect).get().build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(data);
    });

    it('should return a 404 rejection if the redirect url is not returned.', async () => {
      // Arrange
      const target = createRedirectedTarget();
      target.set(endpointRedirect, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(ZHttpCodeRedirection.UseProxy).build());
      const req = new ZHttpRequestBuilder().url(endpointRedirect).get().build();
      // Act
      const actual = await target
        .request(req)
        .then(() => Promise.resolve(null))
        .catch((e) => Promise.resolve(e));
      // Assert
      expect(actual.status).toEqual(ZHttpCodeClient.NotFound);
    });

    it('continues to redirect until a non redirection code is discovered.', async () => {
      // Arrange
      const target = createTestTarget();
      const endpointRedirect2 = 'https://zthunworks.com/api/from-2';
      const endpointRedirect3 = 'https://zthunworks.com/api/from-3';
      target.set(endpointRedirect, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(ZHttpCodeRedirection.Found).redirect(endpointRedirect2).build());
      target.set(endpointRedirect2, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(ZHttpCodeRedirection.Found).redirect(endpointRedirect3).build());
      target.set(endpointRedirect3, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(ZHttpCodeRedirection.Found).redirect(endpointPermanent).build());
      target.set(endpointPermanent, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(ZHttpCodeSuccess.OK).data(data).build());
      const req = new ZHttpRequestBuilder().url(endpointRedirect).get().build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(data);
    });

    async function assertCompletes(requestFn: (t: ZHttpServiceMock, r: IZHttpRequest) => Promise<IZHttpResult>, code: ZHttpCode) {
      // Arrange
      const target = createRedirectedTarget();
      const expected = new ZHttpResultBuilder().data(data).status(code).build();
      target.set(endpointPermanent, ZHttpMethod.Get, () => new ZHttpResultBuilder().status(code).data(data).build());
      const req = new ZHttpRequestBuilder().get().url(endpointRedirect).build();
      // Act
      const actual = await requestFn(target, req).catch(() => Promise.resolve(null));
      // Assert
      expect(actual).toEqual(expected);
    }

    const assertResolvesRequest: (code: ZHttpCode) => Promise<void> = assertCompletes.bind(null, (t: ZHttpServiceMock, r: IZHttpRequest) => t.request(r));
    const assertRejectsRequest: (code: ZHttpCode) => Promise<void> = assertCompletes.bind(null, (t: ZHttpServiceMock, r: IZHttpRequest) => t.request(r).catch((e) => Promise.resolve(e)));

    it('should return a resolved promise for a redirect to a 100.', async () => {
      await assertResolvesRequest(ZHttpCodeInformationalResponse.EarlyHints);
    });

    it('should return a resolved promise for a redirect to a 200.', async () => {
      await assertResolvesRequest(ZHttpCodeSuccess.Accepted);
    });

    it('should return a rejected promise for a redirect to a 400.', async () => {
      await assertRejectsRequest(ZHttpCodeClient.Conflict);
    });

    it('should return a rejected promise for a redirect to a 500.', async () => {
      await assertRejectsRequest(ZHttpCodeServer.BadGateway);
    });
  });

  describe('Data Retrieval', () => {
    let strings: string[];
    let stringsEndpoint: string;
    let numbers: number[];
    let numbersEndpoint: string;

    function list<T>(arr: T[]) {
      return new ZHttpResultBuilder().data(arr).status(ZHttpCodeSuccess.OK).build();
    }

    function create<T>(arr: T[], req: IZHttpRequest) {
      arr.push(req.body.data);
      return new ZHttpResultBuilder().data(req.body.data).status(ZHttpCodeSuccess.Created).build();
    }

    function update<T>(arr: T[], req: IZHttpRequest) {
      arr[req.body.index] = req.body.data;
      return new ZHttpResultBuilder().data(req.body.data).status(ZHttpCodeSuccess.OK).build();
    }

    function createPopulatedTarget() {
      const target = createTestTarget();
      target.set(stringsEndpoint, ZHttpMethod.Get, () => list(strings));
      target.set(stringsEndpoint, ZHttpMethod.Put, (req: IZHttpRequest) => update(strings, req));
      target.set(stringsEndpoint, ZHttpMethod.Post, (req: IZHttpRequest) => create(strings, req));
      target.set(numbersEndpoint, ZHttpMethod.Get, () => list(numbers));
      return target;
    }

    beforeEach(() => {
      strings = ['a', 'b', 'c', 'd', 'e'];
      numbers = [1, 2, 3, 4, 5, 6, 7];
      stringsEndpoint = 'https://zthunworks.com/api/objects';
      numbersEndpoint = 'https://zthunworks.com/api/numbers';
    });

    it('should return a resolved promise for successful data retrievals.', async () => {
      // Arrange
      const target = createPopulatedTarget();
      const req = new ZHttpRequestBuilder().url(stringsEndpoint).get().build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(strings);
    });

    it('should return a resolved promise routing with the correct verb.', async () => {
      // Arrange
      const target = createPopulatedTarget();
      const req = new ZHttpRequestBuilder().url(stringsEndpoint).post({ data: 8 }).build();
      // Act
      const actual = await target.request(req);
      // Assert
      expect(actual.data).toEqual(8);
    });

    it('should return a rejected promise for missing endpoints.', async () => {
      // Arrange
      const target = createPopulatedTarget();
      const req = new ZHttpRequestBuilder().url(numbersEndpoint).put({ data: 8, index: 2 }).build();
      // Act
      const actual: any = await target
        .request(req)
        .then(() => Promise.reject('failed'))
        .catch((e) => Promise.resolve(e));
      // Assert
      expect(actual.status).toEqual(ZHttpCodeClient.NotFound);
    });
  });
});
