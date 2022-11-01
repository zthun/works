/**
 * Represents a size calculation where the sizes are known and do not change.
 *
 * These are calculated in T-Shirt sizes, and they do not change based on
 * where they are place.
 *
 * You can think of this type of size as an entity of size s placed in a box
 * will be the same size of a similar entity placed in a different box.  They
 * both occupy the same size.
 */
export enum ZSizeFixed {
  /**
   * Extra small (xs)
   */
  ExtraSmall = 'xs',
  /**
   * Small (sm)
   */
  Small = 'sm',
  /**
   * Medium (md)
   */
  Medium = 'md',
  /**
   * Large (lg)
   */
  Large = 'lg',
  /**
   * Extra Large (xl)
   */
  ExtraLarge = 'xl'
}

/**
 * Represents a size chart that maps from a static size to a contextual value.
 */
export type ZSizeChartFixed<T> = Record<ZSizeFixed, T>;
