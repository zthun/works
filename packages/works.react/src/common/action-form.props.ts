import { IZComponentActionable } from './component-actionable.interface';
import { IZComponentDisabled } from './component-disabled.interface';
import { IZComponentHeader } from './component-header.interface';
import { IZComponentHierarchy } from './component-hierarchy.interface';
import { IZComponentLoading } from './component-loading.interface';
import { IZComponentStyle } from './component-style.interface';

export interface IZActionFormProps extends IZComponentStyle, IZComponentHeader, IZComponentLoading, IZComponentDisabled, IZComponentHierarchy, IZComponentActionable {
  confirmation: React.ReactNode;
  yesText: string;
  noText: string;
}
