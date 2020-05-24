import { IZProfile } from './profile.interface';

/**
 * Represents an builder that can create a profile object.
 */
export class ZProfileBuilder {
  private _profile: IZProfile = {};

  /**
   * Sets the email.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public email(val: string): this {
    this._profile.email = val;
    return this;
  }

  /**
   * Sets the display.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public display(val: string): this {
    this._profile.display = val;
    return this;
  }

  /**
   * Sets the users current password.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public password(val: string): this {
    this._profile.password = val;
    return this;
  }

  /**
   * Sets the password the user wants to change to.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public newPassword(val: string): this {
    this._profile.newPassword = val;
    return this;
  }

  /**
   * Sets the password confirmation.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public confirm(val: string): this {
    this._profile.confirm = val;
    return this;
  }

  /**
   * Sets the confirmation to the newPassword.
   *
   * @returns This object.
   */
  public autoConfirm(): this {
    this._profile.confirm = this._profile.newPassword;
    return this;
  }

  /**
   * Assigns other properties from a profile to the current profile.
   *
   * @param other The partial object to copy.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZProfile>): this {
    this._profile = Object.assign({}, this._profile, other);
    return this;
  }

  /**
   * Copies all properties from a profile to this profile object.
   *
   * @param other The object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZProfile): this {
    this._profile = Object.assign(this._profile, other);
    return this;
  }

  /**
   * Returns a copy of the built profile.
   *
   * @returns A copy of the built profile.
   */
  public build(): IZProfile {
    return { ...this._profile };
  }
}
