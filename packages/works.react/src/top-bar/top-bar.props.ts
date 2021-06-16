import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZTopBarItem } from './top-bar-item.interface';

/**
 * Represents the properties for the top bar.
 *
 */
export interface IZTopBarProps extends IZComponentHeader, IZComponentHierarchy {
  /**
   * The route to migrate to when the avatar or headerText is clicked.
   */
  route: string;

  /**
   * The item list that appears in the drawer.
   */
  moreItems: IZTopBarItem[];
}
