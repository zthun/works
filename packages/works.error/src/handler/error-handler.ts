import { IZErrorMessageHandler } from './error-message-handler';

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
   *
   * @returns A promise that resolves when the handle
   *          operation completes.
   */
  handle(err: any): Promise<void>;
}

/**
 * Represents the default implementation of the IZErrorHandler.
 *
 * The default implementation attempts to figure out the shape
 * of the error and send an actual message to a message handler.
 */
export class ZErrorHandler implements IZErrorHandler {
  /**
   * Represents the spacing when converting to JSON.
   */
  public static Spacing = '  ';

  /**
   * Initializes a new instance of this object.
   *
   * @param _msg The handler that will receive the message
   *            stripped out from the error.
   */
  public constructor(private _msg: IZErrorMessageHandler) {}

  /**
   * Attempts to unwrap the message from the error object.
   *
   * @param err The error to unwrap.
   *
   * @returns The unwrapped message or null if the message could not be detected.
   */
  private _unwrapMessages(err: any): string[] {
    let msg = null;

    if (Object.hasOwnProperty.call(err, 'code')) {
      // This is probably a ZError.  Try to extract a message.
      msg = this._findMessages(err.english || err.code);
    }

    if (!msg?.length && Object.hasOwnProperty.call(err, 'data')) {
      // This is probably an http object - either from axios or the works.http package result.
      msg = this._findMessages(err.data);
    }

    if (!msg?.length && Object.hasOwnProperty.call(err, 'message')) {
      // An object with a literal message.
      msg = this._findMessages(err.message);
    }

    return msg;
  }

  /**
   * Attempts to build a message from an object.
   *
   * @param err The err object to determine the message.
   *
   * @returns The message parsed from err.
   */
  private _findMessagesFromShape(err: object): string[] {
    const messages = this._unwrapMessages(err);
    return messages == null ? [JSON.stringify(err, undefined, ZErrorHandler.Spacing)] : messages;
  }

  /**
   * Unwraps every message in err and flattens every message into a top level array.
   *
   * @param err The array of errors.
   *
   * @returns The flattened list of error messages.
   */
  private _flattenMessages(err: any[]): string[] {
    let flattened: string[] = [];
    err.forEach((e) => (flattened = flattened.concat(this._findMessages(e))));
    return flattened;
  }

  /**
   * Attempts to build a message.
   *
   * @param err The error to build a message from.
   *
   * @returns A parsed error message from err.
   */
  private _findMessages(err: any): string[] {
    if (err == null) {
      return [];
    }

    if (Array.isArray(err)) {
      return this._flattenMessages(err);
    }

    if (typeof err === 'function') {
      return this._findMessages(err());
    }

    if (typeof err === 'object') {
      return this._findMessagesFromShape(err);
    }

    if (typeof err === 'symbol') {
      return [err.description];
    }

    return [`${err}`];
  }

  /**
   * Handles and error.
   *
   * @param err The error to handle.
   */
  public async handle(err: any): Promise<void> {
    const msg = this._findMessages(err);

    if (msg.length) {
      await this._msg.handle(msg, err);
    }
  }
}
