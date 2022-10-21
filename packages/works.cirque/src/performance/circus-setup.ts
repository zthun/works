import { IZCircusDriver } from '../driver/circus-driver';

/**
 * Represents a step to setup the circus.
 */
export interface IZCircusSetup {
  /**
   * Sets up the circus environment.
   *
   * @returns
   *        The driver result from the setup.
   */
  setup(): Promise<IZCircusDriver>;
}
