import { ZHttpCodeClient } from './http-code-client.enum';
import { ZHttpCodeInformationalResponse } from './http-code-informational-response.enum';
import { ZHttpCodeRedirection } from './http-code-redirection.enum';
import { ZHttpCodeServer } from './http-code-server.enum';
import { ZHttpCodeSuccess } from './http-code-success.enum';

/**
 * Represents a category of http code.
 */
export type ZHttpCode = ZHttpCodeInformationalResponse | ZHttpCodeSuccess | ZHttpCodeRedirection | ZHttpCodeClient | ZHttpCodeServer;
