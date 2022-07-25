import { IZProfile, ZProfileAvatarSize } from '@zthun/works.core';
import { IZHttpService, ZHttpRequestBuilder, ZHttpService } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import md5 from 'md5';
import { createContext, useContext } from 'react';

/**
 * Represents a service to retrieve information about profiles in the zthunworks system.
 */
export interface IZIdentityService {
  /**
   * Reads the current profile from the standard api.
   *
   * @returns A promise that returns the current profile information.
   */
  read(): Promise<IZProfile | null>;

  /**
   * Helper method that retrieves the avatar url for a profile.
   *
   * @param profile The profile to retrieve the avatar url for.
   *
   * @returns The url to load for representation of the profile.
   */
  getAvatar(profile: IZProfile | null | undefined): Promise<string>;

  /**
   * Gets the display for a profile.
   *
   * @param profile The profile to convert to a display string.
   *
   * @returns The appropriate display for the profile.
   */
  getDisplay(profile: IZProfile | null | undefined): Promise<string>;
}

/**
 * Represents the standard implementation of the profile service.
 */
export class ZIdentityService implements IZIdentityService {
  /**
   * Gets the standard rest api url for retrieving and updating profiles.
   *
   * @returns The url for the standard profiles rest api.
   */
  public static createIdentityUrl() {
    return new ZUrlBuilder().api().append('identity').build();
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
  public async read(): Promise<IZProfile | null> {
    try {
      const req = new ZHttpRequestBuilder().get().url(ZIdentityService.createIdentityUrl()).build();
      const response = await this._http.request(req);
      return response.data || null;
    } catch (err) {
      return null;
    }
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
  public getAvatar(profile: IZProfile | null | undefined): Promise<string> {
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
  public getDisplay(profile: IZProfile | null | undefined): Promise<string> {
    const display = profile?.display;
    const email = profile?.email;
    return Promise.resolve(display || email || '');
  }
}

/**
 * The context provider that holds the profile service.
 */
export const ZIdentityServiceContext = createContext<IZIdentityService>(new ZIdentityService(new ZHttpService()));

/**
 * Returns the context profile service.
 *
 * @returns The profile service.
 */
export function useIdentityService() {
  return useContext(ZIdentityServiceContext);
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
export function selectAvatar(avatar: string | null | undefined, email: string | null | undefined): string {
  return avatar || new ZUrlBuilder().gravatar(email ? md5(email) : '', ZProfileAvatarSize).build();
}
