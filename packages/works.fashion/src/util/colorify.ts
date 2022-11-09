import { IZFashion } from '../color/fashion';
import { IZPalette } from '../color/palette';

/**
 * A string that renders transparent in CSS.
 */
export const ZCssTransparent = 'rgb(0, 0, 0, 0)';

/**
 * A function that translates from a palette color to a css color.
 *
 * @param palette
 *        The palette to pull from.
 * @param fashion
 *        The fashion to convert.
 *
 * @returns
 *        Returns the fashion value from the palette.  If fashion represents
 *        transparent, then an rgb string is returned with an opacity of 0
 *        and the shade is ignored.
 */
export function colorify(palette: IZPalette, fashion: IZFashion): string {
  if (fashion.hue == null) {
    return ZCssTransparent;
  }

  return palette[fashion.hue][fashion.shade];
}
