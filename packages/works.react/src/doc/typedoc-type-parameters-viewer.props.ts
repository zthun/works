import { IZTypedocEntity } from '@zthun/works.core';
import { ReactNode } from 'react';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';

/**
 * Represents properties for the ZTypedocTypeParameters component.
 */
export interface IZTypedocTypeParametersViewerProps extends IZComponentEntityRedirect<number> {
  /**
   * The collection of entities that represent the types.
   *
   * If this is falsy or empty, then nothing is rendered.
   */
  types: IZTypedocEntity[];

  /**
   * The prefix to the type parameter list.
   *
   * @default <
   */
  prefix: ReactNode;

  /**
   * The suffix to the type parameter list.
   *
   * @default >
   */
  suffix: ReactNode;

  /**
   * The separator between the type parameters.
   *
   * @default ,
   */
  separator: string;
}
