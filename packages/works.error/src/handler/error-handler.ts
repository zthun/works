import { IZMessageHandler } from './message-handler';

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
  public constructor(private _msg: IZMessageHandler) {}

  /**
   * Attempts to unwrap the message from the error object.
   *
   * @param err The error to unwrap.
   *
   * @returns The unwrapped message or null if the message could not be detected.
   */
  private _unwrapMessage(err: any) {
    let msg = null;

    if (Object.hasOwnProperty.call(err, 'code')) {
      // This may be a proper ZError.  Try to extract a message.
      msg = this._findMessage(err.english || err.code);
    }

    if (msg == null && Object.hasOwnProperty.call(err, 'data')) {
      // This is probably an http object - either from axios or the works.http package result.
      msg = this._findMessage(err.data);
    }

    if (msg == null && Object.hasOwnProperty.call(err, 'message')) {
      // An object with a literal message.
      msg = this._findMessage(err.message);
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
  private _findMessageFromShape(err: object) {
    const message = this._unwrapMessage(err);
    return message == null ? JSON.stringify(err, undefined, ZErrorHandler.Spacing) : message;
  }

  /**
   * Attempts to build a message.
   *
   * @param err The error to build a message from.
   *
   * @returns A parsed error message from err.
   */
  private _findMessage(err: any) {
    if (err == null) {
      return err;
    }

    if (typeof err === 'function') {
      return this._findMessage(err());
    }

    if (typeof err === 'object') {
      return this._findMessageFromShape(err);
    }

    if (typeof err === 'symbol') {
      return err.description;
    }

    return `${err}`;
  }

  /**
   * Handles and error.
   *
   * @param err The error to handle.
   */
  public handle(err: any): void {
    const msg = this._findMessage(err);

    if (msg) {
      this._msg.handle(msg, err);
    }
  }
}
