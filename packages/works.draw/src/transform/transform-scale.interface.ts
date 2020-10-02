/**
 * Represents a transform scale (resize).
 */
export interface IZTransformScale {
  /**
   * A percentage to scale along the x axis.
   */
  readonly scaleX: number;

  /**
   * A percentage to scale along the y axis.
   */
  readonly scaleY: number;

  /**
   * Sets the scale.
   *
   * @param x The scale on the horizontal axis.
   * @param y The scale on the vertical axis.
   *
   * @returns Whatever you want.
   */
  scale(x: number, y: number): any;
}
