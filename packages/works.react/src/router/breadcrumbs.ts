import { IZComponentStyle } from '../component/component-style';

/**
 * Represents a component that renders breadcrumbs.
 */
export interface IZBreadcrumbs extends IZComponentStyle {
  /**
   * Occurs when an item in the breadcrumbs is clicked.
   *
   * @param path
   *        The path that was clicked.
   */
  onClick?(path: string): void;
}
