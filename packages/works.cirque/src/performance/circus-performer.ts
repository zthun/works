import { IZCircusAct } from './circus-act';

/**
 * A performer that performs a circus act.
 */
export interface IZCircusPerformer {
  /**
   * Performs the show.
   *
   * @param show
   *        The act to perform.
   */
  perform(show: IZCircusAct): Promise<void>;
}
