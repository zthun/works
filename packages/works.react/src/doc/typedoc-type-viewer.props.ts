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
   * Suffix element.
   */
  suffix: ReactNode;

  /**
   * Prefix element.
   */
  prefix: ReactNode;

  /**
   * An option that forces the type to be situated at a div root instead of a fragment.
   */
  container: boolean;

  /**
   * Occurs when the user clicks on a reference type with an id.
   */
  onReference(id: number): void;
}
