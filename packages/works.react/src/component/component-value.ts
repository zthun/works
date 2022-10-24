/**
 * Represents a component that takes and modifies a value.
 */
export interface IZComponentValue<T> {
  /**
   * The current value to use.
   */
  value?: T;
  /**
   * Occurs when the value changes.
   */
  onValueChange?: (val: T) => void;
}
