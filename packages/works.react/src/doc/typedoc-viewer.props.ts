import { IZTypedoc, IZTypedocEntity } from '@zthun/works.core';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';

/**
 * Represents the properties for the ZTypedocViewer component.
 */
export interface IZTypedocViewerProps extends IZComponentHeader, IZComponentSizeable, IZComponentActionable, IZComponentEntityRedirect<IZTypedocEntity> {
  /**
   * The typedoc to display.
   */
  typedoc: IZTypedoc;
}
