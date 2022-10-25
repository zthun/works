import { ZColorTint, ZStateColor } from '../theme/state-color';

/**
 * Represents a component that contains color.
 */
export interface IZComponentColor<TColor = ZStateColor> {
  /**
   * The color for the component.
   */
  color?: TColor;

  /**
   * The tint for the color.
   */
  tint?: ZColorTint;
}
