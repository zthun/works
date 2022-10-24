import { ZSizeChartFixed, ZSizeFixed } from './size-fixed';

/**
 * Creates a static chart that is linear across all fixed sizes.
 *
 * This gives you the size chart of f(y) = mx + c where m is the slope,
 * and c is the constant.
 *
 * @param m
 *        The slope of the line.
 * @param c
 *        The constant offset.
 * @param x
 *        The starting value of x
 *
 * @returns
 *        The size chart which graphs the linear equation of mp + c for
 *        x <= p < x + 5.
 */
export function createSizeChartFixedLinear(m: number, c: number, x = 1): ZSizeChartFixed<number> {
  return {
    [ZSizeFixed.ExtraSmall]: m * x + c,
    [ZSizeFixed.Small]: m * (x + 1) + c,
    [ZSizeFixed.Medium]: m * (x + 2) + c,
    [ZSizeFixed.Large]: m * (x + 3) + c,
    [ZSizeFixed.ExtraLarge]: m * (x + 4) + c
  };
}
