import { Typography } from '@material-ui/core';
import { noop } from 'lodash';
import React from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { IZTypedocPropertyViewerProps } from './typedoc-property-viewer.props';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

/**
 * Renders the jsx for a property entity.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for a property entity.
 */
export function ZTypedocPropertyViewer(props: IZTypedocPropertyViewerProps) {
  const def = props.property.defaultValue ? (
    <Typography variant='body2' component='span'>
      {` = ${props.property.defaultValue}`}
    </Typography>
  ) : null;

  return (
    <div className='ZTypedocPropertyViewer-root' data-testid='ZTypedocPropertyViewer-root'>
      <div className='ZTypedocPropertyViewer-signature'>
        <Typography variant='body2' component='span'>
          {props.property.name}
        </Typography>
        <ZTypedocTypeViewer type={props.property.type} prefix=': ' onReference={props.onEntity} />
        {def}
      </div>
      <ZTypedocCommentViewer comment={props.property.comment} />
    </div>
  );
}

ZTypedocPropertyViewer.defaultProps = {
  onEntity: noop
};
