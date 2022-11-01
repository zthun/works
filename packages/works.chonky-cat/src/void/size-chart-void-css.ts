import { ZSizeChartVoid, ZSizeVoid } from './size-void';

/**
 * Creates a void chart for css.
 *
 * @param prop
 *        The property to use to represent void.  Defaults
 *        to none.
 *
 * @returns
 *        The void size chart to set a css size to nothing.
 */
export function createSizeChartVoidCss(): ZSizeChartVoid<string> {
  return {
    [ZSizeVoid.None]: '0'
  };
}
