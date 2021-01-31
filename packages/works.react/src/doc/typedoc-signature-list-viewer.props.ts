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
   * A flag that determines whether or not to put the keyword 'function' in front of call signatures.
   *
   * You should set this to false if you are displaying a method in a grouped interface or class.  This will not
   * affect constructor signatures.
   *
   * @default true
   */
  treatCallSignatureAsFunction: boolean;

  /**
   * Occurs when a child entity is clicked in this component.
   *
   * @param id The id of the entity that was clicked.
   */
  onEntity(id: number): void;
}
