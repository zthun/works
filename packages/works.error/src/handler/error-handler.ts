/**
 * Represents an object that can be used to handle an error.
 *
 * There is no default implementation of this in the error package.
 * Error handling varies from app to app so each app must implement its
 * own error handling, or have a higher level common package that
 * brings together multiple services to handle errors.
 */
export interface IZErrorHandler {
  /**
   * Handles and error.
   *
   * @param err The error to handle.
   */
  handle(err: any): void;
}
