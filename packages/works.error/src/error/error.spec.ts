/* eslint-disable require-jsdoc */
import { ZErrorBuilder } from './error';

describe('ZErrorBuilder', () => {
  let code: number;

  function createTestTarget() {
    return new ZErrorBuilder(code);
  }

  beforeEach(() => {
    code = 400;
  });

  it('sets the error code.', () => {
    expect(createTestTarget().build().code).toEqual(code);
  });

  it('sets the error subCode.', () => {
    const expected = 5121;
    expect(createTestTarget().sub(expected).build().subCode).toEqual(expected);
  });

  it('sets the error type.', () => {
    const expected = 'GenericException';
    expect(createTestTarget().type(expected).build().type).toEqual(expected);
  });

  it('sets the english message.', () => {
    const expected = 'An error has occurred.';
    expect(createTestTarget().english(expected).build().english).toEqual(expected);
  });
});
