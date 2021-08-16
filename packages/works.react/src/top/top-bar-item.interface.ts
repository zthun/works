import { IZComponentHeader } from '../component/component-header.interface';

/**
 * Represents a drawer item in the top bar.
 */
export interface IZTopBarItem extends IZComponentHeader {
  /**
   * The route to navigate to when the item is clicked.
   */
  route?: string;

  /**
   * The window url to open when the item is clicked.
   */
  link?: string;

  /**
   * The target for the link.
   *
   * The default is blank.
   */
  target?: string;

  /**
   * True to mark this item as a separator, false to display the avatar, header and subheader text.
   */
  separator?: boolean;
}
