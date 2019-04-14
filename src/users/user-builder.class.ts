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
  public id(val: string): ZUserBuilder {
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
  public email(val: string): ZUserBuilder {
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
  public password(val: string): ZUserBuilder {
    this._user.password = val;
    return this;
  }

  /**
   * Removes unsafe properties to show users.
   *
   * @return This object.
   */
  public redact(): ZUserBuilder {
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
  public copy(other: IZUser): ZUserBuilder {
    this._user = { ...other };
    return this;
  }

  /**
   * Returns the user.
   *
   * @return The constructed user.
   */
  public user(): IZUser {
    return { ...this._user };
  }
}
