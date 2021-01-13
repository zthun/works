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
  return (
    <Fragment>
      <div className='ZTypedocEntityViewer-root' data-testid='ZTypedocEntityViewer-root'>
        <ZPaperCard headerText={props.entity.name} action={props.action} avatar={<ZTypedocIcon kind={props.entity.kind} size='md' />} subHeaderText={props.entity.kindString} size='lg'>
          <Typography className='ZTypedocEntityViewer-comment-shortText' variant='body2'>
            {props.entity.comment.shortText}
          </Typography>
          <Typography className='ZTypedocEntityViewer-comment-text' variant='body2'>
            {props.entity.comment.text}
          </Typography>
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
