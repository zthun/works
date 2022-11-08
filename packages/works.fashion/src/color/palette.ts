import { keyBy, mapValues } from 'lodash';
import { IZFashion, ZFashionBuilder } from '../color/fashion';
import { ZHue } from '../color/hue';
import { ZLuminance, ZShade, ZShades } from './shade';

/**
 * Represents a collection of colors and what each color/shade map to.
 *
 * A palette is immutable.  To build a palette object, use the
 * ZPaletteBuilder.
 */
export type ZPalette = Readonly<Record<ZHue, ZLuminance>>;

/**
 * Represents a builder for a color palette.
 */
export class ZPaletteBuilder {
  private _palette: Record<ZHue, Record<ZShade, string>>;

  /**
   * Initializes a new instance of this object.
   *
   * This initializes with crayon colors and basic values
   * for a starting palette.  The shade has no effect
   * to start.
   */
  public constructor() {
    this._palette = mapValues(keyBy(ZHue), () => ({} as ZLuminance)) as ZPalette;

    this.crayon(ZHue.White, '#FFFFFF')
      .crayon(ZHue.Red, '#FF0000')
      .crayon(ZHue.Pink, '#FF0075')
      .crayon(ZHue.Purple, '#FF00FF')
      .crayon(ZHue.Violet, '#BB00FF')
      .crayon(ZHue.Indigo, '#7500FF')
      .crayon(ZHue.Blue, '#0000FF')
      .crayon(ZHue.Sky, '#0075FF')
      .crayon(ZHue.Cyan, '#00FFFF')
      .crayon(ZHue.Teal, '#00FFBB')
      .crayon(ZHue.Green, '#00FF00')
      .crayon(ZHue.Olive, '#75FF00')
      .crayon(ZHue.Lime, '#BBFF00')
      .crayon(ZHue.Yellow, '#FFFF00')
      .crayon(ZHue.Amber, '#FFBB00')
      .crayon(ZHue.Orange, '#FF7500')
      .crayon(ZHue.Persimmon, '#FF4000')
      .crayon(ZHue.Brown, '#AA7540')
      .crayon(ZHue.Grey, '#BBBBBB')
      .crayon(ZHue.Black, '#000000');
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
  public luminance(color: ZHue, values: ZLuminance): this {
    const copy: ZLuminance = JSON.parse(JSON.stringify(values));
    this._palette[color] = copy;
    return this;
  }

  /**
   * Sets a specified fashion color.
   *
   * @param val
   *        The fashion value.
   * @param fashion
   *        The specific color fashion to map.
   *
   * @returns
   *        This object.
   */
  public fashion(val: string, fashion: IZFashion): this {
    if (fashion.hue == null) {
      throw new Error('You can not set the fashion color for transparent');
    }

    this._palette[fashion.hue][fashion.shade] = val;
    return this;
  }

  /**
   * Sets a single color for all shades.
   *
   * @param color
   *        The color to update.
   * @param val
   *        The color value to set.
   *
   * @returns
   *        This object.
   */
  public crayon(color: ZHue, val: string): this {
    ZShades.forEach((shade) => {
      const fashion = new ZFashionBuilder().hue(color).shade(shade).build();
      this.fashion(val, fashion);
    });

    return this;
  }

  /**
   * Copies another palette to this palette.
   *
   * @param other
   *        The palette to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: ZPalette): this {
    this._palette = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Returns the currently built map.
   *
   * @returns
   *        The current map that has been built.
   */
  public build(): ZPalette {
    return Object.freeze(JSON.parse(JSON.stringify(this._palette)));
  }
}
