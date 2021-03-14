import { IZTypedoc, IZTypedocEntity } from '@zthun/works.core';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';

/**
 * Represents the properties for the ZTypedocViewer component.
 */
export interface IZTypedocViewerProps extends IZComponentHeader, IZComponentSizeable, IZComponentActionable {
  /**
   * The typedoc to display.
   */
  typedoc: IZTypedoc;

  /**
   * Occurs when an entity is selected.
   *
   * @param entity The entity that was clicked.
   *
   * @returns Anything you want.  Or nothing.
   */
  onEntity(entity: IZTypedocEntity): any;
}
