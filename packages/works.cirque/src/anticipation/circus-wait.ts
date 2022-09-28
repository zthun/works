/**
 * Represents a performance halt.
 */
export interface IZCircusWait {
  wait(predicate: () => boolean): Promise<void>;
}
