/* eslint-disable require-jsdoc */
import { assertBuilderCopiesObject, assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZHttpMethod } from './http-method.enum';
import { ZHttpRequestBuilder } from './http-request-builder.class';
import { IZHttpRequest } from './http-request.interface';

describe('ZHttpRequestBuilder', () => {
  function createTestTarget() {
    return new ZHttpRequestBuilder();
  }

  describe('Properties', () => {
    describe('General', () => {
      it('should set the url.', () => {
        assertBuilderSetsProperty(
          'https://google.com',
          createTestTarget,
          (r, v) => r.url(v),
          (r: IZHttpRequest) => r.url
        );
      });

      it('should set the timeout.', () => {
        assertBuilderSetsProperty(
          5000,
          createTestTarget,
          (t, v) => t.timeout(v),
          (r: IZHttpRequest) => r.timeout
        );
      });
    });

    describe('Method', () => {
      it('should send a GET request.', () => {
        assertBuilderSetsProperty(
          ZHttpMethod.Get,
          createTestTarget,
          (t) => t.get(),
          (r: IZHttpRequest) => r.method
        );
      });

      it('should send a POST request.', () => {
        assertBuilderSetsProperty(
          ZHttpMethod.Post,
          createTestTarget,
          (t) => t.post(),
          (r: IZHttpRequest) => r.method
        );
      });

      it('should send a POST request with a body.', () => {
        const body = { value: 0 };
        assertBuilderSetsProperty(
          body,
          createTestTarget,
          (t, v) => t.post(v),
          (r: IZHttpRequest) => r.body
        );
      });

      it('should send a PUT request.', () => {
        assertBuilderSetsProperty(
          ZHttpMethod.Put,
          createTestTarget,
          (t) => t.put(),
          (r: IZHttpRequest) => r.method
        );
      });

      it('should send a PUT request with a body.', () => {
        const body = { value: 0 };
        assertBuilderSetsProperty(
          body,
          createTestTarget,
          (t, v) => t.put(v),
          (r: IZHttpRequest) => r.body
        );
      });

      it('should send a DELETE request.', () => {
        assertBuilderSetsProperty(
          ZHttpMethod.Delete,
          createTestTarget,
          (t) => t.delete(),
          (r: IZHttpRequest) => r.method
        );
      });

      it('should send a PATCH request.', () => {
        assertBuilderSetsProperty(
          ZHttpMethod.Patch,
          createTestTarget,
          (t) => t.patch(),
          (r: IZHttpRequest) => r.method
        );
      });

      it('should send a PATCH request with a body.', () => {
        const body = { value: 0 };
        assertBuilderSetsProperty(
          body,
          createTestTarget,
          (t, v) => t.patch(v),
          (r: IZHttpRequest) => r.body
        );
      });

      it('should send a OPTIONS request.', () => {
        assertBuilderSetsProperty(
          ZHttpMethod.Options,
          createTestTarget,
          (t) => t.options(),
          (r: IZHttpRequest) => r.method
        );
      });

      it('should send a HEAD request.', () => {
        assertBuilderSetsProperty(
          ZHttpMethod.Head,
          createTestTarget,
          (t) => t.head(),
          (r: IZHttpRequest) => r.method
        );
      });
    });

    describe('Headers', () => {
      it('should add all headers.', () => {
        const expected = {
          'Keep-Alive': 'true',
          'Connection': 'close'
        };

        assertBuilderSetsProperty(
          expected,
          createTestTarget,
          (t, v) => t.headers(v),
          (r: IZHttpRequest) => r.headers
        );
      });

      it('should add individual headers.', () => {
        const expected = {
          keep: 'true',
          connection: 'close',
          time: '5000'
        };

        assertBuilderSetsProperty(
          expected,
          createTestTarget,
          (t) => t.header('keep', true).header('connection', 'close').header('time', 5000),
          (r: IZHttpRequest) => r.headers
        );
      });

      it('should add delete headers.', () => {
        const expected = {
          keep: 'true'
        };

        assertBuilderSetsProperty(
          expected,
          createTestTarget,
          (t) => t.header('keep', true).header('connection', 'close').header('connection', null),
          (r: IZHttpRequest) => r.headers
        );
      });
    });
  });

  describe('Copy', () => {
    it('should copy another request.', () => {
      const expected = new ZHttpRequestBuilder().post({ value: 10 }).url('http://google.com').timeout(5000).header('keep-alive', true).build();
      assertBuilderCopiesObject(expected, createTestTarget);
    });
  });
});
