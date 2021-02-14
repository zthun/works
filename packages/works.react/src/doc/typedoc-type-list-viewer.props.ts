import { IZTypedocType } from '@zthun/works.core';
import { ReactNode } from 'react';

/**
 * Represents properties for the ZTypedocTypeListViewer component.
 */
export interface IZTypedocTypeListViewerProps {
  /**
   * The list of types to render.
   */
  types: IZTypedocType[];

  /**
   * The optional prefix.
   *
   * @default null
   */
  prefix: ReactNode;

  /**
   * The optional suffix.
   *
   * @default null
   */
  suffix: ReactNode;

  /**
   * The optional separator.
   */
  separator: ReactNode;

  /**
   * A flag that determines whether or not to show the component in a root container or to inject it inline with a fragment root.
   */
  container: boolean;

  /**
   * Occurs when an entity is clicked within the type listing.
   *
   * @param id The id of the entity that was clicked.
   */
  onEntity(id: number): void;
}
