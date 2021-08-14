import { IZLogin, IZProfile, ZProfileAvatarSize } from '@zthun/works.core';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import md5 from 'md5';
import { IZProfileService } from './profile-service.interface';

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
   * Initializes a new instance of this object.
   *
   * @param _http The http service to invoke rest api calls.
   */
  public constructor(private _http: IZHttpService) {}

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
    const data = avatar || new ZUrlBuilder().gravatar(email ? md5(email) : '', ZProfileAvatarSize).build();
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
}
