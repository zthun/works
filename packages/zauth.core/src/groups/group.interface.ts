/**
 * Represents a group of users that are given permissions.
 *
 * This can be thought of as a collection of scopes.
 */
export interface IZGroup {
  /**
   * The id of the group.
   */
  _id: string;
  /**
   * The name of the group.
   */
  name: string;
  /**
   * The collection of permission ids available to the group.
   */
  permissions: string[];
  /**
   * The users that belong to the group.
   *
   * This collection may have users that no longer exist.
   * If that is the case, then these users are considered
   * orphans and can be safely ignored.
   */
  users: string[];
}
