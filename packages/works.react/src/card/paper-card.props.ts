import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentConfirmable } from '../component/component-confirmable.interface';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentMedia } from '../component/component-media.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentStyle } from '../component/component-style.interface';

/**
 * Represents the properties for the paper card component.
 */
export interface IZPaperCardProps extends IZComponentHeader, IZComponentHierarchy, IZComponentStyle, IZComponentMedia, IZComponentSizeable, IZComponentLoading, IZComponentDisabled, IZComponentActionable, IZComponentConfirmable {}
