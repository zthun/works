import { sha256 } from 'js-sha256';
import { env } from 'process';
import { v4 } from 'uuid';
import { IZUser } from './user.interface';

/**
 * Represents a builder object for a user.
 */
export class ZUserBuilder {
  /**
   * Constructs a new empty user.
   *
   * @return A new builder object.
   */
  public static empty(): ZUserBuilder {
    return new ZUserBuilder();
  }

  /**
   * Takes an existing user and strips secret information from it.
   *
   * This removes the password and salt from the user.
   *
   * @param from The user to redact.
   *
   * @return This object.
   */
  public static public(from: IZUser): ZUserBuilder {
    return ZUserBuilder.empty().id(from._id).email(from.email);
  }

  private _user: IZUser;

  /**
   * Initializes a new instance of this object.
   */
  private constructor() {
    this._user = {
      email: ''
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
   * Sets the password for the user without hashing.
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
   * Sets the salt used to secure the password.
   *
   * @param val The value to set.
   *
   * @return This object.
   */
  public salt(val: string): ZUserBuilder {
    this._user.salt = val;
    return this;
  }

  /**
   * Encodes the password.
   *
   * @return This object.
   */
  public encode(): ZUserBuilder {
    const pepper = env.AUTH_PEPPER || 'f7f642b7-1dd0-4185-96ea-567f45212fe7';
    const pwd = sha256(`${this._user.salt}${this._user.password}${pepper}`);
    return this.password(pwd);
  }

  /**
   * Merges other's set properties into this user.
   *
   * @param other The object to merge.
   *
   * @return This object.
   */
  public merge(other: Partial<IZUser>): ZUserBuilder {
    this._user = { ...this._user, ...other };
    return this;
  }

  /**
   * Returns the user.
   *
   * @return The constructed user.
   */
  public user(): IZUser {
    return this._user;
  }
}
