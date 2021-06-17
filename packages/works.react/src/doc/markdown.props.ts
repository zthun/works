import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentSource } from '../component/component-source.interface';

/**
 * Represents properties for the markdown viewer.
 */
export interface IZMarkdownProps extends IZComponentHeader, IZComponentSizeable, IZComponentActionable, IZComponentSource {}
