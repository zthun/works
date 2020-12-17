import { ZTypedocKind } from '@zthun/works.core';
import { IZComponentSizeable } from '../component/component-sizeable.interface';

/**
 * The properties for the typedoc icon component.
 */
export interface IZTypedocIconProps extends IZComponentSizeable {
  /**
   * The kind of entity to retrieve the icon for.
   */
  kind: ZTypedocKind;
}
