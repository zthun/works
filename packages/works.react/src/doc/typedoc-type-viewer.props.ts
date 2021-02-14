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
   *
   * @default null
   */
  suffix: ReactNode;

  /**
   * Prefix element.
   *
   * @default null
   */
  prefix: ReactNode;

  /**
   * An option that forces the type to be situated at a div root instead of a fragment.
   *
   * @default true
   */
  container: boolean;

  /**
   * An option to ignore reference ids even if they are present.
   *
   * @default false
   */
  ignoreReferenceIds: boolean;

  /**
   * Occurs when the user clicks on a entity type with an id.
   */
  onReference(id: number): void;
}
