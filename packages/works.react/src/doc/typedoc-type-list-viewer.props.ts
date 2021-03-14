import { IZTypedocType } from '@zthun/works.core';
import { ElementType, ReactNode } from 'react';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';

/**
 * Represents properties for the ZTypedocTypeListViewer component.
 */
export interface IZTypedocTypeListViewerProps extends IZComponentEntityRedirect<number> {
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
   * How to render the prefix node.
   *
   * @default 'span'
   */
  prefixContainer: ElementType<any>;

  /**
   * How to render the suffix.
   *
   * @default 'span'
   */
  suffixContainer: ElementType<any>;

  /**
   * The optional separator.
   */
  separator: ReactNode;

  /**
   * A flag that determines whether or not to show the component in a root container or to inject it inline with a fragment root.
   */
  container: boolean;
}
