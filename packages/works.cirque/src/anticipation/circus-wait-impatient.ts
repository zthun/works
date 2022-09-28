import { IZCircusWait } from './circus-wait';

/**
 * Represents a wait api that just checks the predicate and returns immediately.
 */
export class ZCircusWaitImpatient implements IZCircusWait {
  /**
   * Invokes the predicate immediately and returns based on the result.
   *
   * @param predicate
   *        The predicate to invoke.  If this returns true, then this method
   *        immediately resolves.  If this returns false, then this method
   *        immediately rejects.
   */
  public async wait(predicate: () => boolean): Promise<void> {
    const result = predicate();
    return result ? Promise.resolve() : Promise.reject(new Error('The crowd is impatient and not willing to wait'));
  }
}
