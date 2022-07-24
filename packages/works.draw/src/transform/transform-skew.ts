/**
 * Represents a transform skew (distort).
 */
export interface IZTransformSkew {
  /**
   * The skew on the horizontal axis.
   */
  readonly skewX: number;

  /**
   * The skew on the vertical axis.
   */
  readonly skewY: number;

  /**
   * Applies a skew transformation.
   *
   * @param x The x skew.
   * @param y The y skew.
   *
   * @returns Depends on implementation.
   */
  skew(x: number, y: number): any;
}
