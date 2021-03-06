/* eslint-disable require-jsdoc */
import { assertBuilderSetsProperty } from '@zthun/works.jest';
import { ZHttpCodeClient } from '../http/http-code-client.enum';
import { ZErrorBuilder } from './error-builder.class';
import { IZError } from './error.interface';

describe('ZErrorBuilder', () => {
  let code: number;

  function createTestTarget() {
    return new ZErrorBuilder(code);
  }

  beforeEach(() => {
    code = ZHttpCodeClient.BadRequest;
  });

  it('sets the error code.', () => {
    assertBuilderSetsProperty(
      code,
      createTestTarget,
      (t) => t,
      (e: IZError) => e.code
    );
  });

  it('sets the error subCode.', () => {
    assertBuilderSetsProperty(
      5121,
      createTestTarget,
      (t, v) => t.sub(v),
      (e: IZError) => e.subCode
    );
  });

  it('sets the error type.', () => {
    const type = 'GenericException';
    assertBuilderSetsProperty(
      type,
      createTestTarget,
      (t) => t.type(type),
      (e: IZError) => e.type
    );
  });

  it('sets the english message.', () => {
    const english = 'An error has occurred.';
    assertBuilderSetsProperty(
      english,
      createTestTarget,
      (t) => t.english(english),
      (e: IZError) => e.english
    );
  });
});
