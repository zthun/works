import { sha256 } from 'js-sha256';
import { env } from 'process';

/**
 * A default static pepper in case the environment pepper is not set.
 */
export const STATIC_PEPPER = 'f7f642b7-1dd0-4185-96ea-567f45212fe7';

/**
 * Uses a sha256 hash to encode a password.
 */
export function zsha256(pwd: string, salt: string): string {
  const pepper = env.AUTH_PEPPER || STATIC_PEPPER;
  return sha256(`${salt}${pwd}${pepper}`);
}
