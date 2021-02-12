import { keyBy, noop } from 'lodash';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';
import { ZTypedocDeclarationViewer } from './typedoc-declaration-viewer';
import { IZTypedocEntityViewerProps } from './typedoc-entity-viewer.props';
import { ZTypedocGroupListViewer } from './typedoc-group-list-viewer';
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
    <ZPaperCard
      className='ZTypedocEntityViewer-root'
      data-testid='ZTypedocEntityViewer-root'
      headerText={props.entity.name}
      subHeaderText={props.entity.kindString}
      action={props.action}
      avatar={<ZTypedocIcon kind={props.entity.kind} size='md' />}
      size='xl'
    >
      <ZTypedocDeclarationViewer declaration={props.entity} onEntity={props.onEntity} />
      <ZTypedocGroupListViewer groups={props.entity.groups} dictionary={keyBy(props.entity.children, (ch) => ch.id)} onEntity={props.onEntity} />
    </ZPaperCard>
  );
}

ZTypedocEntityViewer.defaultProps = {
  headerText: null,
  subHeaderText: null,

  action: null,
  avatar: null,

  onEntity: noop
};
