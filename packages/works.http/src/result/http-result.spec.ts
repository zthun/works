/* eslint-disable require-jsdoc */
import { ZHttpCodeRedirection } from './http-code-redirection';
import { ZHttpResultBuilder } from './http-result';

describe('ZHttpResultBuilder', () => {
  function createTestTarget() {
    return new ZHttpResultBuilder<string | null>(null);
  }

  describe('Properties', () => {
    it('should set the data.', () => {
      const expected = 'data';
      expect(createTestTarget().data(expected).build().data).toEqual(expected);
    });

    it('should set the code.', () => {
      expect(createTestTarget().status(ZHttpCodeRedirection.Found).build().status).toEqual(ZHttpCodeRedirection.Found);
    });

    it('should set result headers.', () => {
      const expected = { key: 'value' };
      expect(createTestTarget().headers(expected).build().headers).toEqual(expected);
    });
  });
});
