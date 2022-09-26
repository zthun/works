import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

/**
 * Constructs a performance.
 */
export class ZPerformanceReactTest {
  /**
   * Performs an action within the guise of the circus.
   *
   * @param action
   *        The action that will be performed.
   *
   * @returns
   *        A promise when the action has been completed.
   */
  public async perform(action: () => Promise<any>): Promise<void> {
    await act(async () => {
      await action();
    });
  }

  /**
   * Waits for a specific predicate to be true before continuing.
   *
   * @param predicate
   *        The predicate to wait on.
   *
   * @returns
   *        A promise when the predicate is true.  Rejects
   *        if the predicate never becomes true.
   */
  public async wait(predicate: () => boolean | Promise<boolean>): Promise<void> {
    await waitFor(async () => {
      const value = await predicate();
      expect(value).toBeTruthy();
    });
  }
}
