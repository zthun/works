import { IZComponentHeader } from './component-header.interface';
import { IZComponentHierarchy } from './component-hierarchy.interface';
import { IZComponentLoading } from './component-loading.interface';
import { IZComponentSizeable } from './component-sizeable.interface';
import { IZComponentStyle } from './component-style.interface';

/**
 * Represents the properties for the paper card component.
 */
export interface IZPaperCardProps extends IZComponentHeader, IZComponentHierarchy, IZComponentStyle, IZComponentSizeable, IZComponentLoading {}
