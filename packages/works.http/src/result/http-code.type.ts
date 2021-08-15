import { ZHttpCodeClient, ZHttpCodeClientDescriptions, ZHttpCodeClientNames } from './http-code-client.enum';
import { ZHttpCodeInformationalResponse, ZHttpCodeInformationalResponseDescriptions, ZHttpCodeInformationalResponseNames } from './http-code-informational-response.enum';
import { ZHttpCodeRedirection, ZHttpCodeRedirectionDescriptions, ZHttpCodeRedirectionNames } from './http-code-redirection.enum';
import { ZHttpCodeServer, ZHttpCodeServerDescriptions, ZHttpCodeServerNames } from './http-code-server.enum';
import { ZHttpCodeSuccess, ZHttpCodeSuccessDescriptions, ZHttpCodeSuccessNames } from './http-code-success.enum';

/**
 * Represents a category of http code.
 */
export type ZHttpCode = ZHttpCodeInformationalResponse | ZHttpCodeSuccess | ZHttpCodeRedirection | ZHttpCodeClient | ZHttpCodeServer;

/**
 * Gets the english friendly name of a code.
 *
 * @param code The code to retrieve the name for.
 *
 * @returns The english friendly name of a code.
 */
export function getHttpCodeName(code: ZHttpCode): string {
  return ZHttpCodeInformationalResponseNames[code] || ZHttpCodeSuccessNames[code] || ZHttpCodeRedirectionNames[code] || ZHttpCodeClientNames[code] || ZHttpCodeServerNames[code];
}

/**
 * Gets the english friendly description of a code.
 *
 * @param code The code to retrieve the description for.
 *
 * @returns The english friendly description of a code.
 */
export function getHttpCodeDescription(code: ZHttpCode) {
  return ZHttpCodeInformationalResponseDescriptions[code] || ZHttpCodeSuccessDescriptions[code] || ZHttpCodeRedirectionDescriptions[code] || ZHttpCodeClientDescriptions[code] || ZHttpCodeServerDescriptions[code];
}
