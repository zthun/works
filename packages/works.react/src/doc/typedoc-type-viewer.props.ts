import { IZTypedocType } from '@zthun/works.core';
import { ReactNode } from 'react';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';

/**
 * Represents properties for the type viewer.
 */
export interface IZTypedocTypeViewerProps extends IZComponentEntityRedirect<number> {
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
}
