import { ZSizeChart } from '../size/size';
import { ZSizeChartFixed } from './size-fixed';
import { ZSizeChartVaried } from './size-varied';
import { ZSizeChartVoid } from './size-void';

/**
 * Creates a size chart given a scale and static size chart.
 *
 * @param fixed
 *        Fixed sizes.
 * @param varied
 *        Varied sizes.
 * @param voided
 *        Void sizes.
 *
 * @returns
 *        A size chart that combines the size map.
 */
export function createSizeChart<T>(
  fixed: ZSizeChartFixed<T>,
  varied: ZSizeChartVaried<T>,
  voided: ZSizeChartVoid<T>
): ZSizeChart<T> {
  return {
    ...fixed,
    ...varied,
    ...voided
  };
}
