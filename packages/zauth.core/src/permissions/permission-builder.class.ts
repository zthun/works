import { IZPermission } from './permission.interface';

/**
 * Represents a builder object for IZPermission objects.
 */
export class ZPermissionBuilder {
  private _permission: IZPermission;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._permission = {
      _id: null,
      name: null
    };
  }

  /**
   * Sets the id.
   *
   * @param val The id to set.
   *
   * @returns This object.
   */
  public id(val: string): this {
    this._permission._id = val;
    return this;
  }

  /**
   * Sets the name.
   *
   * @param val The name to set.
   *
   * @returns This object.
   */
  public name(name: string): this {
    this._permission.name = name;
    return this;
  }

  /**
   * Sets the description.
   *
   * @param val The description to set.
   *
   * @returns This object.
   */
  public description(description: string): this {
    this._permission.description = description;
    return this;
  }

  /**
   * Updates all properties with the existing properties of other.
   *
   * @param other The object to assign.
   *
   * @returns This object.
   */
  public assign(other: Partial<IZPermission>): this {
    this._permission = Object.assign(this._permission, other);
    return this;
  }

  /**
   * Copies another permission object.
   *
   * @param other The object to copy.
   *
   * @returns This object.
   */
  public copy(other: IZPermission): this {
    this._permission = Object.assign({}, other);
    return this;
  }

  /**
   * Returns the permission object.
   *
   * @returns A shallow copy of the permission object.
   */
  public build(): IZPermission {
    return { ...this._permission };
  }
}
