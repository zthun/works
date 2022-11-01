import { ZSizeChartVoid, ZSizeVoid } from './size-void';

/**
 * Creates a void size that evaluates the none to numeric 0.
 *
 * @returns
 *        A void size chart that evaluates the none to numeric 0.
 */
export function createSizeChartVoidZero(): ZSizeChartVoid<number> {
  return {
    [ZSizeVoid.None]: 0
  };
}
