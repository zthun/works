/**
 * Represents a handler that takes a string message.
 */
export interface IZMessageHandler {
  /**
   * Handles the msg.
   *
   * @param msg The message that was stripped out from the error.
   * @param err The original error that occurred.  If you don't need this
   *            the your handler can simply take the message by itself.
   */
  handle(msg: string, err: any): void;
}
