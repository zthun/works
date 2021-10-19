import { Typography } from '@mui/material';
import React from 'react';
import { IZTypedocCommentViewerProps } from './typedoc-comment-viewer.props';

/**
 * Renders a typedoc comment object.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for the comment viewer.
 */
export function ZTypedocCommentViewer(props: IZTypedocCommentViewerProps) {
  if (!props.comment) {
    return null;
  }

  const short = props.comment.shortText ? (
    <Typography className='ZTypedocCommentViewer-short' variant='body2'>
      {props.comment.shortText}
    </Typography>
  ) : null;

  const long = props.comment.text ? (
    <Typography className='ZTypedocCommentViewer-text' variant='body2'>
      {props.comment.text}
    </Typography>
  ) : null;

  const returns = props.comment.returns ? (
    <Typography className='ZTypedocCommentViewer-returns' variant='body2'>
      {props.comment.returns}
    </Typography>
  ) : null;

  return (
    <div className='ZTypedocCommentViewer-root' data-testid='ZTypedocCommentViewer-root'>
      {short}
      {long}
      {returns}
    </div>
  );
}
