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
      email: null
    };
  }

  /**
   * Sets the id of the user.
   *
   * @param val The value to set.
   *
   * @return This object.
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
   * @return This object.
   */
  public email(val: string): this {
    this._user.email = val;
    return this;
  }

  /**
   * Sets the password for the user.
   *
   * This should be a hashed value.
   *
   * @param val The value to set.
   *
   * @return This object.
   */
  public password(val: string): this {
    this._user.password = val;
    return this;
  }

  /**
   * Sets the user as the super user.
   */
  public super(): this {
    this._user.super = true;
    return this;
  }

  /**
   * Removes unsafe properties to show users.
   *
   * @return This object.
   */
  public redact(): this {
    delete this._user.password;
    return this;
  }

  /**
   * Copies everything from the other user.
   *
   * @param other The other user to copy.
   *
   * @return This object.
   */
  public copy(other: IZUser): this {
    this._user = { ...other };
    return this;
  }

  /**
   * Returns the user.
   *
   * @return The constructed user.
   */
  public build(): IZUser {
    return { ...this._user };
  }
}
