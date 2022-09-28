import { waitFor } from '@testing-library/react';
import { IZCircusWait } from '@zthun/works.cirque';

/**
 * Wraps the @testing-library/react waitFor method.
 */
export class ZCircusWaitReact implements IZCircusWait {
  /**
   * Waits for the predicate to be truthy.
   *
   * @param predicate
   *        The predicate to wait on.
   */
  public async wait(predicate: () => boolean): Promise<void> {
    await waitFor(() => {
      const result = predicate();
      return result ? Promise.resolve() : Promise.reject();
    });
  }
}
