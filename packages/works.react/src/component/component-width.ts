import { ZSize } from '@zthun/fashion-tailor';

/**
 * Represents a component that contains an optional width.
 */
export interface IZComponentWidth<TSize = ZSize> {
  /**
   * Width of the component.
   */
  width?: TSize;
}
