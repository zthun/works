import { IZTypedocEntity } from '@zthun/works.core';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { IZComponentSource } from '../component/component-source.interface';

/**
 * Represents properties for the ZTypedocViewerSource component.
 */
export interface IZTypedocViewerSourceProps extends IZComponentHeader, IZComponentSizeable, IZComponentActionable, IZComponentSource, IZComponentEntityRedirect<IZTypedocEntity | number> {
  /**
   * The optional entity id to display.
   *
   * If this is defined, then the component for an individual entity is loaded
   * instead of the root typedoc.
   */
  entityId: number;
}
