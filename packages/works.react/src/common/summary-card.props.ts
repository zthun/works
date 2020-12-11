import { IZComponentActionable } from './component-actionable.interface';
import { IZComponentHeader } from './component-header.interface';
import { IZComponentHierarchy } from './component-hierarchy.interface';
import { IZComponentMedia } from './component-media.interface';

export interface IZSummaryCardProps extends IZComponentActionable, IZComponentHeader, Required<IZComponentHierarchy>, IZComponentMedia {}
