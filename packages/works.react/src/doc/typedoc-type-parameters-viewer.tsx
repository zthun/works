import { noop } from 'lodash';
import React, { Fragment } from 'react';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { IZTypedocTypeParametersViewerProps } from './typedoc-type-parameters-viewer.props';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Renders type parameters for functions, classes, an interfaces.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for type parameters.
 */
export function ZTypedocTypeParametersViewer(props: IZTypedocTypeParametersViewerProps) {
  if (!props.types || !props.types.length) {
    return null;
  }

  return (
    <div className='ZTypedocTypeParametersViewer-root' data-testid='ZTypedocTypeParametersViewer-root'>
      {createTypedocTypography(props.prefix)}
      {props.types.map((ty, i) => (
        <Fragment key={ty.id}>
          {createTypedocTypography(ty.name)}
          <ZTypedocTypeViewer type={ty.type} prefix=' extends ' onEntity={props.onEntity} />
          {createTypedocTypography(i === props.types.length - 1 ? null : props.separator)}
        </Fragment>
      ))}
      {createTypedocTypography(props.suffix)}
    </div>
  );
}

ZTypedocTypeParametersViewer.defaultProps = {
  prefix: '<',
  suffix: '>',
  separator: ', ',
  onEntity: noop
};
