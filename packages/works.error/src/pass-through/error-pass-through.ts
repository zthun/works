import { IZErrorHandler } from '../handler/error-handler';

/**
 * Represents an object that can be used to partially handle an
 * error and pass the error through.
 */
export interface IZErrorPassThrough {
  /**
   * Does a partial handling of err and continues a rejected promise
   * chain.
   *
   * @param err The error that occurred.
   *
   * @returns A rejected promise with err as the payload.
   */
  pass(err: any): Promise<never>;
}

/**
 * Represents an implementation of the pass through error handler.
 */
export class ZErrorPassThrough implements IZErrorPassThrough {
  /**
   * Initializes a new instance of this object.
   *
   * @param _handler The error handler.
   */
  public constructor(private _handler: IZErrorHandler) {}

  /**
   * Does a partial handling of err and continues a rejected promise
   * chain.
   *
   * @param err The error that occurred.
   *
   * @returns A rejected promise with err as the payload.
   */
  public async pass(err: any): Promise<never> {
    await this._handler.handle(err);
    return Promise.reject(err);
  }
}
