import { md5 } from '../encoding/hash';
import { IZProfile } from './profile.interface';

/**
 * The standard size of the profile avatar.
 */
export const ZProfileAvatarSize = 256;

/**
 * The root path to the gravatar url.
 */
export const ZProfileGravatarUrl = 'https://s.gravatar.com/avatar';

/**
 * Gets the url for an email gravatar.
 *
 * @param email The email to retrieve the gravatar for.
 *
 * @returns The gravatar for the email.  If email is falsy, returns the default gravatar url.
 */
export function getGravatarUrl(email?: string) {
  const hash = email ? md5(email) : '';
  return `${ZProfileGravatarUrl}/${hash}?s=${ZProfileAvatarSize}`;
}

/**
 * Helper method that retrieves the avatar url for a profile.
 *
 * @param profile The profile to retrieve the avatar url for.
 *
 * @returns The url to load for representation of the profile.
 */
export function getProfileAvatarUrl(profile: IZProfile) {
  const avatar = profile ? profile.avatar : null;
  const email = profile ? profile.email : null;
  return getAvatarUrl(avatar, email);
}

/**
 * Helper method that retrieves the avatar url for a given email and existing avatar.
 *
 * If falsy is passed for both the avatar and email, then the default avatar is returned.
 * If falsy is passed for the avatar and email is set, then the gravatar for the email is returned.
 * If the avatar is set, then it is returned.
 *
 * @param avatar The current avatar url to check.
 * @param email The email to use in the case that the avatar is falsy.
 *
 * @returns The url to load for the profile.
 */
export function getAvatarUrl(avatar: string, email: string) {
  return avatar || getGravatarUrl(email);
}
