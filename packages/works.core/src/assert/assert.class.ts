/**
 * Represents an object that can be used to build a list of assertions.
 */
export class ZAssert {
  /**
   * Initializes a new instance of a ZAssert with one claim.
   *
   * @param claim The claim to make.
   * @param msg The message to throw if the claim is false.
   *
   * @returns A new ZAssert object with an initial claim.
   */
  public static claim(claim: boolean, msg: any): ZAssert {
    return new ZAssert().claim(claim, msg);
  }

  private _messages: any[] = [];

  /**
   * Initializes a new instance of this object.
   */
  private constructor() {}

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
