import { ZSizeChartFixed, ZSizeFixed } from './size-fixed';

/**
 * Creates a fixed size chart that gives the equation of f(y) = a ^ x.
 *
 * @param a
 *        The exponential constant.
 * @param x
 *        The starting power.
 *
 * @returns
 *        A size chart that delivers the numeric values f(y) = a ^ p from where
 *        x <= p <= x + 5.
 */
export function createSizeChartFixedExponential(a: number, x = 1): ZSizeChartFixed<number> {
  return {
    [ZSizeFixed.ExtraSmall]: Math.pow(a, x),
    [ZSizeFixed.Small]: Math.pow(a, x + 1),
    [ZSizeFixed.Medium]: Math.pow(a, x + 2),
    [ZSizeFixed.Large]: Math.pow(a, x + 3),
    [ZSizeFixed.ExtraLarge]: Math.pow(a, x + 4)
  };
}
