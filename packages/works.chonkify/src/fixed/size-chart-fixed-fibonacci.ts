import { ZSizeChartFixed, ZSizeFixed } from './size-fixed';

/**
 * Constructs a static chart that increments each t-shirt size by a fibonacci number.
 *
 * A fibonacci sequence is a sequence where f(n) = f(n -1) + f(n - 2).
 *
 * @param xs
 *        The first starting fibonacci number.
 * @param sm
 *        The second starting fibonacci number.
 *
 * @returns
 *        A static size chart that defines the scale numbers as fibonacci.
 */
export function createSizeChartFixedFibonacci(xs = 1, sm = 2): ZSizeChartFixed<number> {
  const md = xs + sm;
  const lg = sm + md;
  const xl = md + lg;

  return {
    [ZSizeFixed.ExtraSmall]: xs,
    [ZSizeFixed.Small]: sm,
    [ZSizeFixed.Medium]: md,
    [ZSizeFixed.Large]: lg,
    [ZSizeFixed.ExtraLarge]: xl
  };
}
