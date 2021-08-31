import { IZErrorMessageHandler } from '@zthun/works.error';
import { IZLogger, ZLogEntryBuilder } from '@zthun/works.logger';

/**
 * Represents an error message handler that pops an error alert.
 */
export class ZErrorMessageHandlerLogger implements IZErrorMessageHandler {
  /**
   * Initializes a new instance of this object.
   *
   * @param _logger The logger to log the errors to.
   */
  public constructor(private _logger: IZLogger) {}

  /**
   * Handles the error messages.
   *
   * @param msg The error messages to handle.
   */
  public async handle(msg: string[]): Promise<void> {
    msg.forEach((m) => this._logger.log(new ZLogEntryBuilder().error().message(m).build()));
    return Promise.resolve();
  }
}
