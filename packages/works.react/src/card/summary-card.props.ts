import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentMedia } from '../component/component-media.interface';

export interface IZSummaryCardProps extends IZComponentActionable, IZComponentHeader, Required<IZComponentHierarchy>, IZComponentMedia {}
