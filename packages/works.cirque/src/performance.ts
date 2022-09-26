/**
 * Constructs a performance.
 */
export interface IZPerformance {
  /**
   * Performs an action within the guise of the circus.
   *
   * @param action
   *        The action that will be performed.
   *
   * @returns
   *        A promise when the action has been completed.
   */
  perform(action: () => any): Promise<void>;

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
  wait(predicate: () => boolean): Promise<void>;
}
