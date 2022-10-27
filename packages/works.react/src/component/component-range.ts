/**
 * Represents a component that can have a range value.
 */
export interface IZComponentRange<T> {
  /**
   * Minimum value.
   */
  min?: T;
  /**
   * Maximum value (inclusive).
   */
  max?: T;
}
