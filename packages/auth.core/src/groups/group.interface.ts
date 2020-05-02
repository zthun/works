import { IZIdentifiable } from '../common/identifiable.interface';

/**
 * Represents a group of users that are given permissions.
 *
 * This can be thought of as a collection of scopes.
 */
export interface IZGroup extends IZIdentifiable {
  /**
   * The name of the group.
   */
  name: string;

  /**
   * Whether or not the group is a system group.
   *
   * System groups are usually hardcoded in the system itself and should not be deleted.
   */
  system?: boolean;
}
