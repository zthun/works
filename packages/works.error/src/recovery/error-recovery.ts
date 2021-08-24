import { IZErrorHandler } from '../handler/error-handler';

/**
 * Represents an object that can be used to recover from an error.
 */
export interface IZErrorRecovery {
  /**
   * Handles the error and recovers with a specified value.
   *
   * @param err The error that occurred.
   * @param value The value to recover with.
   *
   * @returns A resolved promise with the recovery value.
   */
  recover<T>(err: any, value: T): Promise<T>;
}

/**
 * Represents a basic error recovery.
 */
export class ZErrorRecovery implements IZErrorRecovery {
  /**
   * Initializes a new instance of this object.
   *
   * @param _handler The object that will handle the actual error.
   */
  public constructor(private _handler: IZErrorHandler) {}

  /**
   * Handles the error and recovers with a specified value.
   *
   * @param err The error that occurred.
   * @param value The value to recover with.
   *
   * @returns A resolved promise with the recovery value.
   */
  recover<T>(err: any, value: T): Promise<T> {
    this._handler.handle(err);
    return Promise.resolve(value);
  }
}
