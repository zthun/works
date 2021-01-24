import { IZTypedocEntity } from '@zthun/works.core';

/**
 * Represents the properties for the ZTypedocSignatureListViewer component.
 */
export interface IZTypedocSignatureListViewerProps {
  /**
   * The list of signatures for a method style entity.
   */
  signatures: IZTypedocEntity[];

  /**
   * Occurs when a child entity is clicked in this component.
   *
   * @param id The id of the entity that was clicked.
   */
  onEntity(id: number): void;
}
