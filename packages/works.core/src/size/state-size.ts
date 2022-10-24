/**
 * Represents a constrained size in the zthunworks system
 */
export enum ZStateSize {
  /**
   * No size.  Represents 0.
   *
   * Useful as a default or a starting
   * point to hide content.
   */
  None = 'none',
  /**
   * Auto size.
   *
   * Let the content tell you how big it
   * is without any intervention.
   */
  Auto = 'auto',
  /**
   * Max size.  Take up 100% of the available content.
   * This can also be constrained to a max size.
   */
  Max = 'max',
  /**
   * Extra small.
   */
  ExtraSmall = 'xs',
  /**
   * Small.
   */
  Small = 'sm',
  /**
   * Medium.
   */
  Medium = 'md',
  /**
   * Large.
   */
  Large = 'lg',
  /**
   * Large.
   */
  ExtraLarge = 'xl'
}

/**
 * Represents a size chart that determines the meaning of each size.
 */
export type ZStateSizeChart = Record<ZStateSize, any>;
