import { Typography } from '@material-ui/core';
import { noop } from 'lodash';
import React, { Fragment, ReactNode } from 'react';
import { IZTypedocTypeParametersProps } from './typedoc-type-parameters.props';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Renders type parameters for functions, classes, an interfaces.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for type parameters.
 */
export function ZTypedocTypeParametersViewer(props: IZTypedocTypeParametersProps) {
  if (!props.types || !props.types.length) {
    return null;
  }

  /**
   * Create the typography for this parameters viewer.
   *
   * @param node The child node under the typography.
   *
   * @returns The typography jsx for the type parameters viewer.
   */
  function createTypography(node: ReactNode) {
    return (
      <Typography variant='body2' component='span'>
        {node}
      </Typography>
    );
  }

  return (
    <div className='ZTypedocTypeParametersViewer-root' data-testid='ZTypedocTypeParametersViewer-root'>
      {createTypography(props.prefix)}
      {props.types.map((ty, i) => (
        <Fragment key={ty.id}>
          {createTypography(ty.name)}
          <ZTypedocTypeViewer type={ty.type} prefix=' extends ' onReference={props.onEntity} />
          {createTypography(i === props.types.length - 1 ? null : props.separator)}
        </Fragment>
      ))}
      {createTypography(props.suffix)}
    </div>
  );
}

ZTypedocTypeParametersViewer.defaultProps = {
  prefix: '<',
  suffix: '>',
  separator: ', ',
  onEntity: noop
};
