import { IZTypedocEntity } from '@zthun/works.core';

/**
 * Represents the properties for the ZTypedocPropertyViewer component.
 */
export interface IZTypedocPropertyViewerProps {
  /**
   * The property to render.
   */
  property: IZTypedocEntity;

  /**
   * Occurs when an entity underneath the property is invoked.
   *
   * @param id The id of the entity that was invoked.
   */
  onEntity(id: number): void;
}
