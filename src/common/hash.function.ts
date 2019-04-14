import { compare, hash } from 'bcrypt';

/**
 * Hashes a password.
 *
 * @param pwd The password to hash.
 */
export function zhash(pwd: string): Promise<string> {
  const rounds = 10;
  return hash(pwd, rounds);
}

export function zhashcmp(pwd: string, encrypted: string): Promise<boolean> {
  return compare(pwd, encrypted);
}
