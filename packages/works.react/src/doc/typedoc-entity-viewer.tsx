import { Typography } from '@material-ui/core';
import { noop } from 'lodash';
import React, { Fragment } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { IZTypedocEntityViewerProps } from './typedoc-entity-viewer.props';
import { ZTypedocIcon } from './typedoc-icon';

/**
 * Represents a viewer for a typedoc entity.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that displays the entity information.
 */
export function ZTypedocEntityViewer(props: IZTypedocEntityViewerProps) {
  /**
   * Creates the tsx for the comment paragraphs.
   *
   * @returns The tsx for the comment fragment.
   */
  function createComment() {
    if (!props.entity.comment) {
      return null;
    }

    const short = props.entity.comment.shortText ? (
      <Typography className='ZTypedocEntityViewer-comment-shortText' variant='body2'>
        {props.entity.comment.shortText}
      </Typography>
    ) : null;

    const long = props.entity.comment.text ? (
      <Typography className='ZTypedocEntityViewer-comment-text' variant='body2'>
        {props.entity.comment.text}
      </Typography>
    ) : null;

    return (
      <Fragment>
        {short}
        {long}
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className='ZTypedocEntityViewer-root' data-testid='ZTypedocEntityViewer-root'>
        <ZPaperCard headerText={props.entity.name} action={props.action} avatar={<ZTypedocIcon kind={props.entity.kind} size='md' />} subHeaderText={props.entity.kindString} size='lg'>
          {createComment()}
        </ZPaperCard>
      </div>
    </Fragment>
  );
}

ZTypedocEntityViewer.defaultProps = {
  headerText: null,
  subHeaderText: null,

  action: null,
  avatar: null,

  onEntity: noop
};
