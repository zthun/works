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
  return (
    <div className='ZTypedocPropertyViewer-root'>
      <div className='ZTypedocPropertyViewer-signature'>
        <Typography variant='body2' component='span'>
          {props.property.name}
        </Typography>
        <ZTypedocTypeViewer type={props.property.type} prefix=': ' suffix={props.property.defaultValue ? ` = ${props.property.defaultValue}` : null} onReference={props.onEntity} />
      </div>
      <ZTypedocCommentViewer comment={props.property.comment} />
    </div>
  );
}

ZTypedocPropertyViewer.defaultProps = {
  onEntity: noop
};
