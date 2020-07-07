import { IZProfileActivation } from './profile-activation.interface';

/**
 * Represents a builder for an IZProfileActivation object.
 */
export class ZProfileActivationBuilder {
  private _activation: IZProfileActivation;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._activation = {
      email: null,
      activationKey: null
    };
  }

  /**
   * Sets the email.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public email(val: string): this {
    this._activation.email = val;
    return this;
  }

  /**
   * Sets the activation key.
   *
   * @param val The value to set.
   *
   * @returns This object.
   */
  public key(val: string): this {
    this._activation.activationKey = val;
    return this;
  }

  /**
   * Assigns a partial profile activation object to the current activation object.
   *
   * @param other The activation object to assign.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZProfileActivation>): this {
    this._activation = Object.assign({}, this._activation, other);
    return this;
  }

  /**
   * Copies an activation object to the current activation object.
   *
   * @param other The activation object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZProfileActivation): this {
    this._activation = Object.assign(this._activation, other);
    return this;
  }

  /**
   * Returns a copy of the built object.
   *
   * @returns A copy of the built object.
   */
  public build(): IZProfileActivation {
    return { ...this._activation };
  }
}
