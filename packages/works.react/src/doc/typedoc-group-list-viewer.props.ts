import { IZTypedocEntity, IZTypedocGroup } from '@zthun/works.core';

/**
 * Represents the properties for the ZTypedocGroupListViewer.
 */
export interface IZTypedocGroupListViewerProps {
  /**
   * The groups to render.
   */
  groups: IZTypedocGroup[];

  /**
   * The dictionary that contains what entities map to what ids.
   */
  dictionary: { [id: number]: IZTypedocEntity };

  /**
   * Occurs when a child entity is clicked inside any of the groups.
   */
  onEntity(id: number): void;
}
