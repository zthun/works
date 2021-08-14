import { IZProfile } from '@zthun/works.core';

/**
 * Represents a service to retrieve information about profiles in the zthunworks system.
 */
export interface IZProfileService {
  /**
   * Reads the current profile from the standard api.
   *
   * @returns A promise that returns the current profile information.
   */
  read(): Promise<IZProfile>;

  /**
   * Helper method that retrieves the avatar url for a profile.
   *
   * @param profile The profile to retrieve the avatar url for.
   *
   * @returns The url to load for representation of the profile.
   */
  getAvatar(profile: IZProfile): Promise<string>;

  /**
   * Gets the display for a profile.
   *
   * @param profile The profile to convert to a display string.
   *
   * @returns The appropriate display for the profile.
   */
  getDisplay(profile: IZProfile): Promise<string>;
}
