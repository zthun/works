import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentStyle } from '../component/component-style.interface';

export interface IZActionFormProps extends IZComponentStyle, IZComponentHeader, IZComponentLoading, IZComponentDisabled, IZComponentHierarchy, IZComponentActionable {
  confirmation: React.ReactNode;
  yesText: string;
  noText: string;
}
