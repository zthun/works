import { IZTypedocEntity } from '@zthun/works.core';
import React, { Fragment, ReactNode } from 'react';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { makeStyles } from '../theme/make-styles';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

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
  prefix?: ReactNode;

  /**
   * The suffix to the type parameter list.
   *
   * @default >
   */
  suffix?: ReactNode;

  /**
   * The separator between the type parameters.
   *
   * @default ,
   */
  separator?: string;
}

const useParametersViewerStyles = makeStyles()(() => ({
  root: {
    display: 'inline-block'
  }
}));

/**
 * Renders type parameters for functions, classes, an interfaces.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for type parameters.
 */
export function ZTypedocTypeParametersViewer(props: IZTypedocTypeParametersViewerProps) {
  const { types, prefix = '<', suffix = '>', separator = ', ', onEntity } = props;
  const styles = useParametersViewerStyles();

  if (!types || !types.length) {
    return null;
  }

  return (
    <div className={`ZTypedocTypeParametersViewer-root ${styles.classes.root}`} data-testid='ZTypedocTypeParametersViewer-root'>
      {createTypedocTypography(prefix)}
      {types.map((ty, i) => (
        <Fragment key={ty.id}>
          {createTypedocTypography(ty.name)}
          <ZTypedocTypeViewer type={ty.type} prefix=' extends ' onEntity={onEntity} />
          {createTypedocTypography(i === types.length - 1 ? null : separator)}
        </Fragment>
      ))}
      {createTypedocTypography(suffix)}
    </div>
  );
}
