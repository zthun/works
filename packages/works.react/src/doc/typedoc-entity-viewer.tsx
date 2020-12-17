import { noop } from 'lodash';
import React, { Fragment } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { IZTypedocEntityViewerProps } from './typedoc-entity-viewer.props';

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
        <ZPaperCard headerText='Entity' subHeaderText='You are in the right place.' loading={props.loading} />
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
