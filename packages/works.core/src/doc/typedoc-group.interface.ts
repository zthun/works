import { ZTypedocKind } from './typedoc-kind.enum';

/**
 * Represents a grouping
 */
export interface IZTypedocGroup {
  /**
   * English group title.
   */
  title: string;
  /**
   * Group kind.
   */
  kind: ZTypedocKind;
  /**
   * Id list of children in the group.
   */
  children: number[];
}
