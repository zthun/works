/**
 * Represents a handler that takes a string message.
 */
export interface IZErrorMessageHandler {
  /**
   * Handles the messages.
   *
   * @param msg The messages that were stripped out from the error.
   * @param err The original error that occurred.  If you don't need this
   *            the your handler can simply take the message by itself.
   */
  handle(msg: string[], err: any): void;
}

/**
 * Represents a message handler that forwards all messages to child message handlers.
 */
export class ZErrorMessageHandlerComposite implements IZErrorMessageHandler {
  /**
   * Initializes a new instance of this object.
   *
   * @param _children The child message handlers.
   */
  public constructor(private _children: IZErrorMessageHandler[]) {}

  /**
   * Handles the messages.
   *
   * @param msg The messages that were stripped out from the error.
   * @param err The original error that occurred.  If you don't need this
   *            the your handler can simply take the message by itself.
   */
  public handle(msg: string[], err: any) {
    this._children.forEach((ch) => ch.handle(msg, err));
  }
}
