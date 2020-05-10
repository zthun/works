/**
 * The name of the database.
 */
export const DatabaseName = 'auth';

/**
 * The collections inside the database.
 */
export enum Collections {
  /**
   * The users collection.
   */
  Users = 'users',
  /**
   * The groups collection.
   */
  Groups = 'groups',
  /**
   * The collection that references groups to permissions.
   */
  GroupsPermissions = 'groups-permissions',
  /**
   * The collection that references groups to users.
   */
  GroupsUsers = 'groups-users',
  /**
   * The permissions collection.
   */
  Permissions = 'permissions',
  /**
   * The token collection.
   */
  Tokens = 'tokens'
}
