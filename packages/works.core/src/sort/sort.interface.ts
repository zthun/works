import { ZSortDirection } from './sort-direction.enum';

/**
 * Represents an option for sorting.
 */
export interface IZSort {
  /**
   * The field id to sort by.
   */
  field: string;
  /**
   * The direction to sort.
   */
  direction: ZSortDirection;
}
