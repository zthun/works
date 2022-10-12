import { IZComponentAvatar } from './component-avatar';

/**
 * Represents a component that contains a header and subheader.
 */
export interface IZComponentHeader extends IZComponentAvatar {
  /**
   * The header text.
   */
  headerText: string;

  /**
   * The subheader text.
   */
  subHeaderText?: string;
}
