import { IZUser } from './user.interface';

/**
 * Represents a builder object for a user.
 */
export class ZUserBuilder {
  private _user: IZUser;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._user = {
      _id: null,
      email: null,
      password: null
    };
  }

  /**
   * Sets the id of the user.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public id(val: string): this {
    this._user._id = val;
    return this;
  }

  /**
   * Sets the user email.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public email(val: string): this {
    this._user.email = val;
    return this;
  }

  /**
   * Sets the display name of the user.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public display(val: string): this {
    this._user.display = val;
    return this;
  }

  /**
   * Sets the password for the user.
   *
   * This should be a hashed value.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public password(val: string): this {
    this._user.password = val;
    return this;
  }

  /**
   * Removes the activator if it is set.
   *
   * @returns This object.
   */
  public active(): this {
    delete this._user.activator;
    return this;
  }

  /**
   * Sets the user as inactive and sets the one time password to activate or reactivate the account.
   *
   * @param key The one time password to activate the account.  These last for 1 hour.
   * @param time The total time that the activation code lasts before the user needs to request another one.
   *
   * @returns This object.
   */
  public inactive(key: string, time = 3600000): this {
    const exp = new Date().getTime() + time;
    this._user.activator = { key, exp };
    return this;
  }

  /**
   * Sets the recovery password.
   *
   * @param password The temporary hashed password.
   * @param time The ttl that the password will live.  Default is 15 minutes.
   *
   * @returns This object.
   */
  public recover(password: string, time = 900000) {
    const exp = new Date().getTime() + time;
    this._user.recovery = { password, exp };
    return this;
  }

  /**
   * Sets the base64 avatar for this user.
   *
   * @param val The avatar image data.
   *
   * @returns This object.
   */
  public avatar(val: string) {
    this._user.avatar = val;
    return this;
  }

  /**
   * Removes the password recovery and marks a timestamp of the users last login.
   *
   * @returns This object.
   */
  public login() {
    this._user.login = new Date().getTime();
    this._user.recovery = null;
    return this;
  }

  /**
   * Sets the user as the super user.
   *
   * @returns This object.
   */
  public super(): this {
    this._user.super = true;
    return this;
  }

  /**
   * Copies everything from the other user.
   *
   * @param other The other user to copy.
   *
   * @returns This object.
   */
  public copy(other: IZUser): this {
    this._user = { ...other };
    return this;
  }

  /**
   * Returns the user.
   *
   * @returns The constructed user.
   */
  public build(): IZUser {
    return { ...this._user };
  }
}
