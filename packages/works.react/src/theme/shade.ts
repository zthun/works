import { padStart } from 'lodash';

/**
 * Takes a hex string and shades it by an amount.
 *
 * @param hex The hex color.
 * @param magnitude The amount to shade as a number percentage.
 *
 * @returns The lightened or darkened hex color.
 */
export function shade(hex: string, magnitude: number) {
  let shaded = hex.replace('#', '');

  if (shaded.length === 2) {
    shaded = `${shaded}${shaded}${shaded}`;
  }

  if (shaded.length === 3) {
    shaded = `${shaded}${shaded}`;
  }

  if (shaded.length !== 6) {
    return hex;
  }

  const num = parseInt(shaded, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + magnitude));
  const b = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + magnitude));
  const g = Math.max(0, Math.min(255, (num & 0x0000ff) + magnitude));

  return `#${padStart((g | (b << 8) | (r << 16)).toString(16), 6, '0')}`;
}
