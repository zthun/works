/**
 * Represents a generic cookie in the zthunworks domain.
 */
export interface IZCookie {
  /**
   * The cookie name.
   */
  name: string;
  /**
   * The cookie value.
   */
  value: string;
  /**
   * The scope domain attached to the cookie.
   */
  domain?: string;
  /**
   * The date at which the cookie expires
   */
  expires?: Date;
  /**
   * A flag that determines if this is a secure cookie.
   */
  secure?: boolean;
  /**
   * A flag that determines if this cookie can be ready by javascript.
   */
  httpOnly?: boolean;
  /**
   * A value that determines how the cookie is sent by the browser.
   */
  sameSite?: 'lax' | 'strict' | 'none';
}

/**
 * Represents a builder for an IZCookie object.
 */
export class ZCookieBuilder {
  public static readonly MillisecondsOneDay = 86400000;

  private _cookie: IZCookie;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._cookie = {
      name: '',
      value: ''
    };
  }

  /**
   * Sets the cookie name.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public name(val: string): this {
    this._cookie.name = val;
    return this;
  }

  /**
   * Sets the cookie value.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public value(val: string): this {
    this._cookie.value = val;
    return this;
  }

  /**
   * Sets the cookie domain.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public domain(val: string): this {
    this._cookie.domain = val;
    return this;
  }

  /**
   * Sets the cookie expiration date.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public expires(val: Date): this {
    this._cookie.expires = val;
    return this;
  }

  /**
   * Sets the cookie expiration date to one day from the moment this is invoked.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public expiresTomorrow(): this {
    return this.expires(new Date(Date.now() + ZCookieBuilder.MillisecondsOneDay));
  }

  /**
   * Sets the cookie secure flag.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public secure(val = true): this {
    this._cookie.secure = val;
    return this;
  }

  /**
   * Sets the cookie same site policy.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public sameSite(val: 'lax' | 'strict' | 'none'): this {
    this._cookie.sameSite = val;
    return this;
  }

  /**
   * Creates a token based authentication cookie.
   *
   * @param token The token value for the cookie.  You
   *              can leave this as undefined to set it
   *              later.
   *
   * @returns This object.
   */
  public authentication(token?: string): this {
    const builder = this.name('Authentication').expiresTomorrow().secure().httpOnly();
    return token == null ? builder : builder.value(token);
  }

  /**
   * Sets the same site policy to 'lax'
   *
   * @returns This object.
   */
  public lax = this.sameSite.bind(this, 'lax');

  /**
   * Sets the same site polity to 'strict'
   *
   * @returns This object.
   */
  public strict = this.sameSite.bind(this, 'strict');

  /**
   * Sets the same site policy to 'none' and turns on the secure flag.
   *
   * @returns This object.
   */
  public allowCrossSite(): this {
    return this.secure().sameSite('none');
  }

  /**
   * Sets the cookie http only flag.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public httpOnly(val = true): this {
    this._cookie.httpOnly = val;
    return this;
  }

  /**
   * Returns a copy of the built instance of the cookie.
   *
   * @returns A shallow copy of the current cookie object.
   */
  public build(): IZCookie {
    return { ...this._cookie };
  }
}
