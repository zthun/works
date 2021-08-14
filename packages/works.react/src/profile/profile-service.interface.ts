import { IZLogin, IZProfile, IZProfileActivation } from '@zthun/works.core';

/**
 * Represents a service to retrieve information about profiles in the zthunworks system.
 */
export interface IZProfileService {
  /**
   * Creates a new profile.
   *
   * @param credentials The login credentials.
   *
   * @returns A promise that resolves with the new login profile,
   *          or a promise that rejects with an error.
   */
  create(credentials: IZLogin): Promise<IZProfile>;

  /**
   * Reads the current profile from the standard api.
   *
   * @returns A promise that returns the current profile information.
   */
  read(): Promise<IZProfile>;

  /**
   * Updates the user profile.
   */
  update(profile: Partial<IZProfile>): Promise<IZProfile>;

  /**
   * Deletes the users profile.
   */
  delete(): Promise<void>;

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

  /**
   * Logs the user into the system.
   *
   * @param credentials The credentials to use when logging in.
   *
   * @returns A promise that resolves with a profile that was logged in.
   */
  login(credentials: IZLogin): Promise<IZProfile>;

  /**
   * Logs the user out of the system.
   *
   * @returns A promise that resolves with a successful logout and rejects
   *          if the endpoint cannot be reached.
   */
  logout(): Promise<void>;

  /**
   * Sends a recovery email to the given login.
   *
   * @returns A promise that resolves with a recovery login or a rejected
   *          promise if the operation failed.
   */
  recover(credentials: IZLogin): Promise<void>;

  /**
   * Activates the users profile.
   *
   * @param activation The activation key used to activate the profile.
   *
   * @returns A promise that returns the updated profile.
   */
  activate(activation: IZProfileActivation): Promise<IZProfile>;

  /**
   * Deactivates the users profile.
   *
   * @returns A promise that returns the updated profile.
   */
  deactivate(): Promise<IZProfile>;

  /**
   * Reactivates the users profile.
   *
   * This should send the user a new activation email with an updated
   * key.
   *
   * @param activation The activation that targets the specified email to activate.
   *
   * @returns A promise that returns the updated profile.
   */
  reactivate(activation: IZProfileActivation): Promise<IZProfile>;
}
