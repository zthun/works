import { IZTypedocEntity } from '@zthun/works.core';
import { ReactNode } from 'react';
import { IZComponentSizeable } from '../component/component-sizeable.interface';

/**
 * Represents the properties for the ZTypedocEntityViewer.
 */
export interface IZTypedocEntityViewerProps extends IZComponentSizeable {
  /**
   * The avatar icon for the heading component.
   *
   * @default null
   */
  action: ReactNode;

  /**
   * The entity to display information about.
   */
  entity: IZTypedocEntity;

  /**
   * Occurs when the user clicks another entity object from within the entity.
   */
  onEntity(other: IZTypedocEntity): void;
}
