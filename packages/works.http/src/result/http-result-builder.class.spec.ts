/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZHttpCodeRedirection } from './http-code-redirection.enum';
import { ZHttpResultBuilder } from './http-result-builder.class';
import { IZHttpResult } from './http-result.interface';

describe('ZHttpResultBuilder', () => {
  function createTestTarget() {
    return new ZHttpResultBuilder();
  }

  describe('Properties', () => {
    it('should set the data.', () => {
      assertBuilderSetsProperty(
        'data',
        createTestTarget,
        (t, v) => t.data(v),
        (r: IZHttpResult) => r.data
      );
    });

    it('should set the code.', () => {
      assertBuilderSetsProperty(
        ZHttpCodeRedirection.Found,
        createTestTarget,
        (t, v) => t.status(v),
        (r: IZHttpResult) => r.status
      );
    });

    it('should set result headers.', () => {
      assertBuilderSetsProperty(
        { key: 'value' },
        createTestTarget,
        (t, v) => t.headers(v),
        (r: IZHttpResult) => r.headers
      );
    });

    it('should set redirect url.', () => {
      assertBuilderSetsProperty(
        'google.com',
        createTestTarget,
        (t, v) => t.redirect(v),
        (r: IZHttpResult) => r.url
      );
    });
  });
});
