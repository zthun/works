import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentConfirmable } from '../component/component-confirmable.interface';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentStyle } from '../component/component-style.interface';

export interface IZActionFormProps extends IZComponentStyle, IZComponentHeader, IZComponentLoading, IZComponentDisabled, IZComponentHierarchy, IZComponentActionable, IZComponentConfirmable {}
