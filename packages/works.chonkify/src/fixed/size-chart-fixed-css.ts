import { ZSizeChartFixed, ZSizeFixed } from './size-fixed';

/**
 * Creates a size chart that is meant to convert from a ZStaticSize object to a css size given units.
 *
 * @param sizes
 *        The current size conversion.
 * @param unit
 *        The unit to convert with.
 *
 * @returns
 *        A ZStaticSizeChart that converts all sizes to unit based css sizes.
 */
export function createSizeChartFixedCss(
  sizes: ZSizeChartFixed<number>,
  unit: 'rem' | 'px' | 'em'
): ZSizeChartFixed<string> {
  return {
    [ZSizeFixed.ExtraSmall]: `${sizes.xs}${unit}`,
    [ZSizeFixed.Small]: `${sizes.sm}${unit}`,
    [ZSizeFixed.Medium]: `${sizes.md}${unit}`,
    [ZSizeFixed.Large]: `${sizes.lg}${unit}`,
    [ZSizeFixed.ExtraLarge]: `${sizes.xl}${unit}`
  };
}
