/**
 * Represents a step to setup the circus.
 */
export interface IZCircusSetup<T> {
  /**
   * Sets up the circus environment.
   *
   * @returns
   *        The object that was setup.
   *        This can be anything or nothing at all.
   */
  setup(): Promise<T>;
}
