import { ZColor } from './color';
import { ZColorTint } from './color-tint';

/**
 * Represents a color fashion.
 */
export interface IZColorFashion {
  /**
   * The base color.
   */
  color: ZColor;
  /**
   * The color tint.
   *
   * If this is not specified, then Main
   * is considered the default.
   */
  tint?: ZColorTint;
}

/**
 * Gets a value that determines if an object represents a color fashion.
 *
 * @param obj
 *        The object to check.
 *
 * @returns
 *        True if obj can assume the shape of an IZColorFashion object.
 */
export function isColorFashion(obj: any): obj is IZColorFashion {
  return Object.prototype.hasOwnProperty.call(obj, 'color');
}
