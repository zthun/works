import { Typography } from '@mui/material';
import { IZTypedocComment } from '@zthun/works.core';
import React from 'react';
import { makeStyles } from '../theme/make-styles';

/**
 * Represents the properties for the comment viewer.
 */
export interface IZTypedocCommentViewerProps {
  /**
   * The comment to render.
   */
  comment: IZTypedocComment;
}

const useTypedocCommentViewerStyles = makeStyles()((theme) => {
  const token = {
    'marginBottom': theme.sizing.gaps.md,

    '&.MuiTypography-root': {
      marginBottom: theme.sizing.gaps.md
    }
  };

  return {
    short: token,
    text: token,
    returns: token
  };
});

/**
 * Renders a typedoc comment object.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for the comment viewer.
 */
export function ZTypedocCommentViewer(props: IZTypedocCommentViewerProps) {
  const { comment } = props;
  const styles = useTypedocCommentViewerStyles();

  if (!comment) {
    return null;
  }

  const { shortText, text, returns } = comment;

  const shortNode = shortText ? (
    <Typography className={`ZTypedocCommentViewer-short ${styles.classes.short}`} variant='body2'>
      {shortText}
    </Typography>
  ) : null;

  const longNode = text ? (
    <Typography className={`ZTypedocCommentViewer-text ${styles.classes.text}`} variant='body2'>
      {text}
    </Typography>
  ) : null;

  const returnNode = returns ? (
    <Typography className={`ZTypedocCommentViewer-returns ${styles.classes.returns}`} variant='body2'>
      {returns}
    </Typography>
  ) : null;

  return (
    <div className='ZTypedocCommentViewer-root' data-testid='ZTypedocCommentViewer-root'>
      {shortNode}
      {longNode}
      {returnNode}
    </div>
  );
}
