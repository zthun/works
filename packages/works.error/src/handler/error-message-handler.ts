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
  handle(msg: string[], err: any): Promise<void>;
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
   *
   * @returns A promise that resolves when all of the child handles have handled their errors.
   */
  public async handle(msg: string[], err: any): Promise<void> {
    await Promise.all(this._children.map((ch) => ch.handle(msg, err)));
  }
}
