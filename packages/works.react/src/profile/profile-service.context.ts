import { IZLogin, IZProfile, IZProfileActivation, ZProfileAvatarSize } from '@zthun/works.core';
import { IZHttpService, ZHttpRequestBuilder, ZHttpService } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import md5 from 'md5';
import { createContext, useContext } from 'react';

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

/**
 * Represents the standard implementation of the profile service.
 */
export class ZProfileService implements IZProfileService {
  /**
   * Gets the standard rest api url for retrieving and updating profiles.
   *
   * @returns The url for the standard profiles rest api.
   */
  public static createProfilesUrl() {
    return new ZUrlBuilder().api().append('profiles').build();
  }

  /**
   * Gets the url for the tokens service.
   *
   * @returns The url for the tokens rest api.
   */
  public static createTokensUrl(): string {
    return new ZUrlBuilder().api().append('tokens').build();
  }

  /**
   * Gets the url for the profile recovery service.
   *
   * @returns The url for the profile recovery api.
   */
  public static createRecoveryUrl(): string {
    return new ZUrlBuilder().api().append('profiles').append('recoveries').build();
  }

  /**
   * Gets the url for profile activation.
   *
   * @returns The url for the activation rest api.
   */
  public static createActivationsUrl(): string {
    return new ZUrlBuilder().api().append('profiles').append('activations').build();
  }

  /**
   * Initializes a new instance of this object.
   *
   * @param _http The http service to invoke rest api calls.
   */
  public constructor(private _http: IZHttpService) {}

  /**
   * Creates a new profile.
   *
   * @param credentials The login credentials.
   *
   * @returns A promise that resolves with the new login profile,
   *          or a promise that rejects with an error.
   */
  public async create(credentials: IZLogin): Promise<IZProfile> {
    const req = new ZHttpRequestBuilder().post(credentials).url(ZProfileService.createProfilesUrl()).build();
    const res = await this._http.request(req);
    return res.data;
  }

  /**
   * Gets the current profile from the standard api.
   *
   * @returns A promise that returns the current profile information.
   */
  public async read(): Promise<IZProfile> {
    const req = new ZHttpRequestBuilder().get().url(ZProfileService.createProfilesUrl()).build();

    try {
      const response = await this._http.request(req);
      return response.data;
    } catch {
      return null;
    }
  }

  /**
   * Updates the current users profile.
   *
   * @param profile The profile information to update.
   *
   * @returns The updated profile.
   */
  public async update(profile: Partial<IZProfile>): Promise<IZProfile> {
    const req = new ZHttpRequestBuilder().put(profile).url(ZProfileService.createProfilesUrl()).build();
    const result = await this._http.request<IZProfile>(req);
    return result.data;
  }

  /**
   * Deletes the current users profile.
   */
  public async delete(): Promise<void> {
    const req = new ZHttpRequestBuilder().delete().url(ZProfileService.createProfilesUrl()).build();
    await this._http.request(req);
  }

  /**
   * Gets the avatar for a profile.
   *
   * This will use the avatar set by the user or this will
   * use the users gravatar if one exists.
   *
   * @param profile The profile to retrieve the avatar url for.
   *
   * @returns A promise that resolves with the avatar data.
   */
  public getAvatar(profile: IZProfile): Promise<string> {
    const avatar = profile?.avatar;
    const email = profile?.email;
    const data = selectAvatar(avatar, email);
    return Promise.resolve(data);
  }

  /**
   * Gets the display for the profile.
   *
   * @param profile The profile to convert to a display string.
   *
   * @returns The appropriate display for the profile.
   */
  public getDisplay(profile: IZProfile): Promise<string> {
    const display = profile?.display;
    const email = profile?.email;
    return Promise.resolve(display || email || '');
  }

  /**
   * Logs the user into the system.
   *
   * @param credentials The credentials to use when logging in.
   *
   * @returns A promise that resolves with a successful login and rejects
   *          if the credentials are invalid.
   */
  public async login(credentials: IZLogin): Promise<IZProfile> {
    const req = new ZHttpRequestBuilder().post(credentials).url(ZProfileService.createTokensUrl()).build();
    await this._http.request(req);
    return this.read();
  }

  /**
   * Logs the user out of the system.
   *
   * @returns A promise that resolves with a successful logout and rejects
   *          if the endpoint cannot be reached.
   */
  public async logout(): Promise<void> {
    const req = new ZHttpRequestBuilder().delete().url(ZProfileService.createTokensUrl()).build();
    await this._http.request(req);
  }

  /**
   * Sends a recovery email to the given login.
   *
   * @param credentials The login to recover.
   *
   * @returns A promise that resolves with a recovery login or a rejected
   *          promise if the operation failed.
   */
  public async recover(credentials: IZLogin): Promise<void> {
    const req = new ZHttpRequestBuilder().post(credentials).url(ZProfileService.createRecoveryUrl()).build();
    await this._http.request(req);
  }

  /**
   * Activates the users profile.
   *
   * @param activation The activation key used to activate the profile.
   *
   * @returns A promise that returns the updated profile.
   */
  public async activate(activation: IZProfileActivation): Promise<IZProfile> {
    const req = new ZHttpRequestBuilder().put(activation).url(ZProfileService.createActivationsUrl()).build();
    const actual = await this._http.request(req);
    return actual.data;
  }

  /**
   * Deactivates the users profile.
   *
   * @returns A promise that returns the updated profile.
   */
  public async deactivate(): Promise<IZProfile> {
    const req = new ZHttpRequestBuilder().delete().url(ZProfileService.createActivationsUrl()).build();
    const actual = await this._http.request(req);
    return actual.data;
  }

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
  public async reactivate(activation: IZProfileActivation): Promise<IZProfile> {
    const req = new ZHttpRequestBuilder().post(activation).url(ZProfileService.createActivationsUrl()).build();
    const actual = await this._http.request(req);
    return actual.data;
  }
}

/**
 * The context provider that holds the profile service.
 */
export const ZProfileServiceContext = createContext<IZProfileService>(new ZProfileService(new ZHttpService()));

/**
 * Returns the context profile service.
 *
 * @returns The profile service.
 */
export function useProfileService(): IZProfileService {
  return useContext(ZProfileServiceContext);
}

/**
 * Select's a profiles avatar based on the given settings.
 *
 * @param avatar The current avatar data url.
 * @param email The email for the profile that owns the avatar.
 *
 * @returns Avatar if the avatar is truthy, or the gravatar for the email if it is
 *          falsy.  If the user does not have a gravatar, then the default gravatar
 *          image is shown.
 */
export function selectAvatar(avatar: string, email: string): string {
  return avatar || new ZUrlBuilder().gravatar(email ? md5(email) : '', ZProfileAvatarSize).build();
}
