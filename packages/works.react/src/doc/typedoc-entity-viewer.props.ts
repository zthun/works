import { IZTypedocEntity } from '@zthun/works.core';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';

/**
 * Represents the properties for the ZTypedocEntityViewer.
 */
export interface IZTypedocEntityViewerProps extends IZComponentSizeable, IZComponentActionable, IZComponentEntityRedirect<number> {
  /**
   * The entity to display information about.
   */
  entity: IZTypedocEntity;
}
