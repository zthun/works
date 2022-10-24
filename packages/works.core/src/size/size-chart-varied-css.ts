import { ZSizeChartVaried, ZSizeVaried } from './size-varied';

/**
 * Constructs a scale size chart for css usage.
 *
 * @returns
 *        The chart that can be used to convert scale sizes
 *        to css supported values.
 */
export function createSizeChartVariedCss(): ZSizeChartVaried<string> {
  return {
    [ZSizeVaried.Fit]: 'auto',
    [ZSizeVaried.Full]: '100%'
  };
}
