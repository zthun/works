import { IZTypedocGroup } from '@zthun/works.core';
import { keyBy, noop } from 'lodash';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { IZTypedocEntityViewerProps } from './typedoc-entity-viewer.props';
import { ZTypedocIcon } from './typedoc-icon';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';

/**
 * Represents a viewer for a typedoc entity.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that displays the entity information.
 */
export function ZTypedocEntityViewer(props: IZTypedocEntityViewerProps) {
  /**
   * Creates the jsx for an individual group.
   *
   * @param group The group to create for.
   *
   * @returns The jsx that represents the group.
   */
  function createGroup(group: IZTypedocGroup) {
    const dict = keyBy(props.entity.children, (ch) => ch.id);
    const entities = group.children.map((id) => dict[id]).filter((en) => !!en);

    return (
      <div className='ZTypedocEntityViewer-group' key={group.kind}>
        <div className='ZTypedocEntityViewer-group-header'>{createTypedocTypography(group.title, 'h4', 'h4')}</div>
        <hr />
        {entities.map((en) => (
          <ZTypedocSignatureListViewer key={en.id} owner={en} signatures={[en]} onEntity={props.onEntity} />
        ))}
      </div>
    );
  }
  return (
    <ZPaperCard
      className='ZTypedocEntityViewer-root'
      data-testid='ZTypedocEntityViewer-root'
      headerText={props.entity.name}
      subHeaderText={props.entity.kindString}
      avatar={<ZTypedocIcon kind={props.entity.kind} size='md' />}
      size={props.size}
      actionText={props.actionText}
      actionColor={props.actionColor}
      onAction={props.onAction}
    >
      <ZTypedocSignatureListViewer owner={props.entity} signatures={[props.entity]} onEntity={props.onEntity} />
      {(props.entity.groups || []).map((gr) => createGroup(gr))}
    </ZPaperCard>
  );
}

ZTypedocEntityViewer.defaultProps = {
  headerText: null,
  subHeaderText: null,

  avatar: null,

  actionText: null,
  actionType: 'button',
  actionColor: 'primary',
  size: 'xl',

  onAction: noop,
  onEntity: noop
};
