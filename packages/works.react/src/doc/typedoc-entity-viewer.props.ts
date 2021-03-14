import { IZTypedocEntity } from '@zthun/works.core';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';

/**
 * Represents the properties for the ZTypedocEntityViewer.
 */
export interface IZTypedocEntityViewerProps extends IZComponentSizeable, IZComponentActionable {
  /**
   * The entity to display information about.
   */
  entity: IZTypedocEntity;

  /**
   * Occurs when the user clicks another entity object from within the entity.
   *
   * @param id The id of the entity that was clicked.
   */
  onEntity(id: number): void;
}
