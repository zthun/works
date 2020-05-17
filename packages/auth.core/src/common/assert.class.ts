/**
 * Represents an object that can be used to build a list of assertions.
 */
export class ZAssert {
  private _messages: any[] = [];

  /**
   * Adds a claim.
   *
   * @param claim The claim predicate.
   * @param msg The message to add if the claim fails.
   *
   * @returns This object.
   */
  public claim(claim: boolean, msg: any): this {
    if (!claim) {
      this._messages.push(msg);
    }
    return this;
  }

  /**
   * Runs the assertion.
   *
   * @param fail The factory that is responsible for returning the specified error to throw.
   */
  public assert<E extends Error>(fail: (message: any | any[]) => E): void {
    if (this._messages.length === 1) {
      throw fail(this._messages[0]);
    }

    if (this._messages.length) {
      throw fail(this._messages);
    }
  }
}
