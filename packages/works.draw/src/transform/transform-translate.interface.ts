/**
 * Represents a transform translation (move).
 */
export interface IZTransformTranslate {
  readonly translateX: number;
  readonly translateY: number;

  translate(x: number, y: number): any;
}
