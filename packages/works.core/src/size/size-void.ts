/**
 * A size that represents nothing.
 */
export enum ZSizeVoid {
  /**
   * No size.
   *
   * Basically 0.
   */
  None = 'none'
}

/**
 * A chart for void sizes.
 */
export type ZSizeChartVoid<T> = Record<ZSizeVoid, T>;
