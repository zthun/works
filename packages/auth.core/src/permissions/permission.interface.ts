import { IZIdentifiable } from '../common/identifiable.interface';

/**
 * Represents a user permission.
 */
export interface IZPermission extends IZIdentifiable {
  /**
   * The name of the permission.
   */
  name: string;

  /**
   * An optional description of the permission.
   */
  description?: string;

  /**
   * Marks the permission as a system permission.
   *
   * System permissions are hardcoded into the system and
   * should not be deleted.
   */
  system?: boolean;
}
