/**
 * Vary sizes vary with the area for which they exist in or to the content which exists in them.
 */
export enum ZSizeVaried {
  /**
   * Fit to whatever is inside the box.
   */
  Fit = 'fit',

  /**
   * Size to take up the space in the area for which the context exists.
   */
  Full = 'full'
}

/**
 * A chart that maps scale sizes to contextual values.
 */
export type ZSizeChartVaried<T> = Record<ZSizeVaried, T>;
