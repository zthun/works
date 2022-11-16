import { ZSizeChartFixed, ZSizeFixed } from './size-fixed';

/**
 * Creates a static chart that creates an arithmetic sequence
 *
 * This gives you the size chart of f(y) = mx + c where m is the slope,
 * and c is the constant.
 *
 * @param increment
 *        The increment between each successive item.
 * @param xs
 *        The starting value.
 *
 * @returns
 *        The size chart which sequences the arithmetic sequence from xs to xl incremented by increment.
 */
export function createSizeChartFixedArithmetic(increment: number, xs: number): ZSizeChartFixed<number> {
  const sm = xs + increment;
  const md = sm + increment;
  const lg = md + increment;
  const xl = lg + increment;

  return {
    [ZSizeFixed.ExtraSmall]: xs,
    [ZSizeFixed.Small]: sm,
    [ZSizeFixed.Medium]: md,
    [ZSizeFixed.Large]: lg,
    [ZSizeFixed.ExtraLarge]: xl
  };
}
