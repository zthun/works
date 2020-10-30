import { IZComponentHeader } from '../common/component-header.interface';
import { IZComponentSizeable } from '../common/component-sizeable.interface';

/**
 * Represents properties for the markdown viewer.
 */
export interface IZMarkdownViewerProps extends IZComponentHeader, IZComponentSizeable {
  /**
   * The source to fetch.
   */
  src: string;
}
