import { hash, compare } from 'bcryptjs';

/**
 * Utility class for generating cryptography safe string to store in a database.
 */
export abstract class ZCrypt {
  /**
   * Total number of encryption rounds to make.
   */
  public static Rounds = 10;

  /**
   * Hashes the secret.
   *
   * @param secret the secret to hash.
   *
   * @returns The hashed secret.
   */
  public static hash(secret: string): Promise<string> {
    return hash(secret, ZCrypt.Rounds);
  }

  /**
   * Compares a current un-hashed string to a hashed secret.
   *
   * @param current The current string to hash.
   * @param secret The hashed secret.
   *
   * @returns A promise that resolves to true if the secret matches the string text.
   */
  public static compare(current: string, secret: string): Promise<boolean> {
    return compare(current, secret);
  }
}
