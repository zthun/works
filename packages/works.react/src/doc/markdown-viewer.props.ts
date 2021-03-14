import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';

/**
 * Represents properties for the markdown viewer.
 */
export interface IZMarkdownViewerProps extends IZComponentHeader, IZComponentSizeable, IZComponentActionable {
  /**
   * The source to fetch.
   */
  src: string;
}
