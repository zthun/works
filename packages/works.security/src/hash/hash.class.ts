import md5 from 'md5';
import { v4 } from 'uuid';

/**
 * Represents a helper utility for generating hashes from strings.
 */
export abstract class ZHash {
  /**
   * Generates an md5 hash from a message.
   *
   * @param message The message to generate the md5 from.
   *
   * @returns The md5 hash of message.
   */
  public static md5(message: string | Buffer | number[]) {
    return md5(message);
  }

  /**
   * Returns a new guid.
   *
   * @returns A new guid.
   */
  public static guid() {
    return v4();
  }
}
