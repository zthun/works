/* istanbul ignore file */

// Request
export { ZHttpMethod } from './request/http-method.enum';
export { ZHttpRequestBuilder } from './request/http-request-builder.class';
export { IZHttpRequest } from './request/http-request.interface';
// Result
export { ZHttpCodeClient, ZHttpCodeClientDescriptions, ZHttpCodeClientNames } from './result/http-code-client.enum';
export { ZHttpCodeInformationalResponse, ZHttpCodeInformationalResponseNames, ZHttpCodeInformationalResponseDescriptions } from './result/http-code-informational-response.enum';
export { ZHttpCodeRedirection, ZHttpCodeRedirectionNames, ZHttpCodeRedirectionDescriptions } from './result/http-code-redirection.enum';
export { ZHttpCodeServer, ZHttpCodeServerNames, ZHttpCodeServerDescriptions } from './result/http-code-server.enum';
export { ZHttpCodeSuccess, ZHttpCodeSuccessNames, ZHttpCodeSuccessDescriptions } from './result/http-code-success.enum';
export { ZHttpCode, ZHttpCodeSeverity, ZHttpCodeCategory, getHttpCodeName, getHttpCodeDescription, getHttpCodeSeverity, getHttpCodeCategory } from './result/http-code.type';
export { ZHttpResultBuilder } from './result/http-result-builder.class';
export { IZHttpResult } from './result/http-result.interface';
// Service
export { ZHttpService } from './service/http-service.class';
export { ZHttpServiceMock } from './service/http-service-mock.class';
export { IZHttpService } from './service/http-service.interface';
