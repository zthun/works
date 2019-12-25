/**
 * Represents a user permission.
 */
export interface IZPermission {
  /**
   * The id of the permission.
   *
   * Usually, you want this to be a unique value that is easily accessable.
   * It's not a good idea to make this a guid.
   */
  _id: string;
  /**
   * The name of the permission.
   */
  name: string;
  /**
   * An optional description of the permission.
   */
  description?: string;
}
