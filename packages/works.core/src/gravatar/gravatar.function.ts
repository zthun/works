/**
 * The root path to the gravatar url.
 */
export const ZGravatarUrl = 'https://s.gravatar.com/avatar';

/**
 * Gets the url for an email gravatar.
 *
 * @param hash The email md5 hash to retrieve the gravatar for.  If this is falsy, then the default gravatar is returned.
 * @param size The dimension of the gravatar.  The default is 80x80.
 *
 * @returns The gravatar for the email.  If email is falsy, returns the default gravatar url.
 */
export function getGravatarUrl(hash?: string, size = 80) {
  hash = hash || '';
  return `${ZGravatarUrl}/${hash}?s=${size}`;
}
