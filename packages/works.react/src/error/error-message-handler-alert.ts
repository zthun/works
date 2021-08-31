import { IZErrorMessageHandler } from '@zthun/works.error';
import { IZAlertService, ZAlertBuilder } from '@zthun/works.message';

/**
 * Represents an error message handler that pops an error alert.
 */
export class ZErrorMessageHandlerAlert implements IZErrorMessageHandler {
  /**
   * Initializes a new instance of this object.
   *
   * @param _alerts The service for popping alerts.
   */
  public constructor(private _alerts: IZAlertService) {}

  /**
   * Handles the error messages.
   *
   * @param msg The error messages to handle.
   *
   * @returns A promise that resolves once the alerts are shown.
   */
  public async handle(msg: string[]): Promise<void> {
    const message = msg.join('\n');
    const alert = new ZAlertBuilder().error().message(message).build();
    await this._alerts.create(alert);
  }
}
