/* eslint-disable require-jsdoc */
import { ZHttpCodeClient, ZHttpCodeClientDescriptions, ZHttpCodeClientNames } from './http-code-client.enum';
import { ZHttpCodeInformationalResponse, ZHttpCodeInformationalResponseDescriptions, ZHttpCodeInformationalResponseNames } from './http-code-informational-response.enum';
import { ZHttpCodeRedirection, ZHttpCodeRedirectionDescriptions, ZHttpCodeRedirectionNames } from './http-code-redirection.enum';
import { ZHttpCodeServer, ZHttpCodeServerDescriptions, ZHttpCodeServerNames } from './http-code-server.enum';
import { ZHttpCodeSuccess, ZHttpCodeSuccessDescriptions, ZHttpCodeSuccessNames } from './http-code-success.enum';
import { getHttpCodeDescription, getHttpCodeName, ZHttpCode } from './http-code.type';

describe('ZHttpCode', () => {
  function assertValueFromDictionary(fn: (code: ZHttpCode) => string, dictionary: { [key: number]: string }, code: ZHttpCode) {
    // Arrange
    const expected = dictionary[code];
    // Act
    const actual = fn(code);
    // Assert
    expect(actual).toEqual(expected);
  }

  describe('Name', () => {
    const assertName = assertValueFromDictionary.bind(null, getHttpCodeName);

    it('returns for an informational code.', () => {
      assertName(ZHttpCodeInformationalResponseNames, ZHttpCodeInformationalResponse.EarlyHints);
    });

    it('returns for a success code.', () => {
      assertName(ZHttpCodeSuccessNames, ZHttpCodeSuccess.MultiStatus);
    });

    it('returns for a redirect code.', () => {
      assertName(ZHttpCodeRedirectionNames, ZHttpCodeRedirection.PermanentRedirect);
    });

    it('returns for a client error code.', () => {
      assertName(ZHttpCodeClientNames, ZHttpCodeClient.ImATeapot);
    });

    it('returns for a server error code.', () => {
      assertName(ZHttpCodeServerNames, ZHttpCodeServer.HttpVersionNotSupported);
    });
  });

  describe('Description', () => {
    const assertDescription = assertValueFromDictionary.bind(null, getHttpCodeDescription);

    it('returns for an informational code.', () => {
      assertDescription(ZHttpCodeInformationalResponseDescriptions, ZHttpCodeInformationalResponse.EarlyHints);
    });

    it('returns for a success code.', () => {
      assertDescription(ZHttpCodeSuccessDescriptions, ZHttpCodeSuccess.MultiStatus);
    });

    it('returns for a redirect code.', () => {
      assertDescription(ZHttpCodeRedirectionDescriptions, ZHttpCodeRedirection.PermanentRedirect);
    });

    it('returns for a client error code.', () => {
      assertDescription(ZHttpCodeClientDescriptions, ZHttpCodeClient.ImATeapot);
    });

    it('returns for a server error code.', () => {
      assertDescription(ZHttpCodeServerDescriptions, ZHttpCodeServer.HttpVersionNotSupported);
    });
  });
});
