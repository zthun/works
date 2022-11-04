import { keyBy, mapValues } from 'lodash';
import { ZColor } from './color';
import { isColorFashion, IZColorFashion } from './color-fashion';
import { ZColorHue } from './color-hue';
import { ZColorNone } from './color-none';
import { ZColorPriority } from './color-priority';
import { ZColorSeverity } from './color-severity';
import { ZColorShade } from './color-shade';
import { ZColorTint } from './color-tint';

export type ZColorTintMap = Record<ZColorTint, string>;
export type ZColorMap = Record<ZColor, ZColorTintMap>;

/**
 * Represents a builder for a color map.
 */
export class ZColorMapBuilder {
  private _map: ZColorMap;

  /**
   * Initializes a new instance of this object.
   *
   * Upon initialization, the color map is completely
   * colorless and all colors evaluate to black with the
   * exception of Inherit and Transparent which evaluate
   * to rgba(0, 0, 0, 0);
   */
  public constructor() {
    const tints = Object.values(ZColorTint);
    const transparency = Object.values(ZColorNone);
    const hues = Object.values(ZColorHue);
    const priorities = Object.values(ZColorPriority);
    const severities = Object.values(ZColorSeverity);
    const shades = Object.values(ZColorShade);

    const colors: ZColor[] = ([] as ZColor[])
      .concat(transparency)
      .concat(hues)
      .concat(priorities)
      .concat(severities)
      .concat(shades);

    const tintLookup = keyBy(tints);
    const tintMap = mapValues(tintLookup, () => '#000');
    this._map = mapValues(keyBy(colors), () => JSON.parse(JSON.stringify(tintMap))) as ZColorMap;

    transparency.forEach((t) => {
      this._map[t] = mapValues(tintLookup, () => 'rgba(0, 0, 0, 0)') as ZColorTintMap;
    });

    this._map[ZColorShade.White] = mapValues(tintLookup, () => '#FFF') as ZColorTintMap;
  }

  /**
   * Sets the fashion model for a color.
   *
   * @param color
   *        The color to set.
   * @param values
   *        The values to set for the color.
   *
   * @returns
   *        This object.
   */
  public model(color: ZColor, values: ZColorTintMap): this {
    this._map[color] = JSON.parse(JSON.stringify(values));
    return this;
  }

  /**
   * Sets the specified fashion color.
   *
   * @param val
   *        The color value to target.
   * @param color
   *        The color to set.
   * @param tint
   *        The tint of the color to set.  If this is falsy,
   *        then ZColorTint.Main is used.
   *
   * @returns
   *        This object.
   */
  public fashion(val: string, color: ZColor, tint?: ZColorTint): this;

  /**
   * Sets the specified fashion color.
   *
   * @param val
   *        The color value to target.
   * @param fashion
   *        The fashion to target.  If this objects tint is falsy,
   *        then it is assumed to be ZColorTint.Main.
   *
   * @returns
   *        This object.
   */
  public fashion(val: string, fashion: IZColorFashion): this;

  /**
   * Sets a specified fashion color.
   *
   * @param val
   *        The fashion value.
   * @param colorOrFashion
   *        The fashion color
   * @param tint
   *        The color tint.
   *
   * @returns
   *        This object.
   */
  public fashion(val: string, colorOrFashion: ZColor | IZColorFashion, tint?: ZColorTint): this {
    const _color = isColorFashion(colorOrFashion) ? colorOrFashion.color : colorOrFashion;
    const __tint = isColorFashion(colorOrFashion) ? colorOrFashion.tint : tint;
    const _tint = __tint ?? ZColorTint.Main;

    this._map[_color][_tint] = val;
    return this;
  }

  /**
   * Copies another color map to this map.
   *
   * @param other
   *        The color map to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: ZColorMap): this {
    this._map = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the currently built map.
   *
   * @returns
   *        The current map that has been built.
   */
  public build(): ZColorMap {
    return JSON.parse(JSON.stringify(this._map));
  }
}
