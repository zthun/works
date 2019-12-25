import { IZGroup } from './group.interface';

/**
 * Represents a builder for a group.
 */
export class ZGroupBuilder {
  private _group: IZGroup;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._group = {
      _id: null,
      name: '',
      permissions: [],
      users: []
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
    this._group._id = val;
    return this;
  }

  /**
   * Sets the name.
   *
   * @param val The name to set.
   *
   * @returns This object.
   */
  public name(val: string): this {
    this._group.name = val;
    return this;
  }

  /**
   * Sets all the permissions for this group.
   *
   * @param val The permission array to set.  If this is falsy, then an empty array is set.
   *
   * @returns This object.
   */
  public permissions(val: string[]): this {
    this._group.permissions = val || [];
    return this;
  }

  /**
   * Adds a permission.
   *
   * @param val The permission to add.
   *
   * @returns This object.
   */
  public permission(val: string): this {
    this._group.permissions.push(val);
    return this;
  }

  /**
   * Sets all the users for this group.
   *
   * @param val The user array to set.  If this is falsy, then an empty array is set.
   *
   * @returns This object.
   */
  public users(val: string[]): this {
    this._group.users = val || [];
    return this;
  }

  /**
   * Adds a user.
   *
   * @param val The user to add.
   *
   * @returns This object.
   */
  public user(val: string): this {
    this._group.users.push(val);
    return this;
  }

  /**
   * Builds the group and returns it.
   *
   * The return value will be a deep copy.
   *
   * @returns The built group.
   */
  public build(): IZGroup {
    return JSON.parse(JSON.stringify(this._group));
  }
}
