import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentStyle } from '../component/component-style.interface';

/**
 * Represents the properties for the paper card component.
 */
export interface IZPaperCardProps extends IZComponentHeader, IZComponentHierarchy, IZComponentStyle, IZComponentSizeable, IZComponentLoading {}
