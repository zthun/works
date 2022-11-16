import { startCase } from 'lodash';
import { IZFashion } from '../color/fashion';

/**
 * Gets the name of a fashion.
 *
 * A fashion name is similar to it's hue + shade.
 *
 * @param fashion
 *        The fashion to convert to a string.  If this is null or
 *        undefined, then the empty string is returned.
 *
 * @returns
 *        The string representation of the fashion.
 */
export function stringify(fashion: IZFashion | undefined | null): string {
  if (fashion == null) {
    return '';
  }

  if (fashion.hue === null) {
    return 'Transparent';
  }

  if (fashion.hue === 'inherit') {
    return startCase(fashion.hue);
  }

  return `${startCase(fashion.hue)} [${fashion.shade}]`;
}
