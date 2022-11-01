import { ZSizeChartFixed, ZSizeFixed } from './size-fixed';

/**
 * Creates a size chart that conforms to a geometric sequence.
 *
 * @param ratio
 *        The ratio function that calculates the increment between a sequence index.
 * @param xs
 *        The starting size of xs.
 *
 * @returns
 *        The fixed size chart that set the geometric sequence.
 */
export function createSizeChartFixedGeometric(ratio: number, xs: number): ZSizeChartFixed<number> {
  const sm = xs * ratio;
  const md = sm * ratio;
  const lg = md * ratio;
  const xl = lg * ratio;

  return {
    [ZSizeFixed.ExtraSmall]: xs,
    [ZSizeFixed.Small]: sm,
    [ZSizeFixed.Medium]: md,
    [ZSizeFixed.Large]: lg,
    [ZSizeFixed.ExtraLarge]: xl
  };
}
