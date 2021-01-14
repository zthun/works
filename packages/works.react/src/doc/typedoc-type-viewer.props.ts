import { IZTypedocType } from '@zthun/works.core';
import { ReactNode } from 'react';

/**
 * Represents properties for the type viewer.
 */
export interface IZTypedocTypeViewerProps {
  /**
   * The type to view.
   */
  type: IZTypedocType;

  /**
   * The separator character.
   */
  separator: ReactNode;

  /**
   * Whether or not to add the header colon to the front of the type.
   */
  header: ReactNode;

  /**
   * Occurs when the user clicks on a reference type with an id.
   */
  onReference(id: number): void;
}
