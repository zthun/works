import { Typography } from '@material-ui/core';
import { IZTypedocEntity, IZTypedocGroup, ZTypedocKind } from '@zthun/works.core';
import { keyBy, noop } from 'lodash';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { IZTypedocEntityViewerProps } from './typedoc-entity-viewer.props';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { ZTypedocIcon } from './typedoc-icon';
import { ZTypedocPropertyViewer } from './typedoc-property-viewer';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';

/**
 * Represents a viewer for a typedoc entity.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that displays the entity information.
 */
export function ZTypedocEntityViewer(props: IZTypedocEntityViewerProps) {
  const lookup = keyBy(props.entity.children, (ch) => ch.id);

  /**
   * Creates the jsx for the documentation under an entity.
   *
   * @param entity The entity to create the doc for.
   *
   * @returns The jsx for the documentation.
   */
  function createDocumentation(entity: IZTypedocEntity) {
    switch (entity.kind) {
      case ZTypedocKind.Constructor:
      case ZTypedocKind.Method:
      case ZTypedocKind.Function:
        return <ZTypedocSignatureListViewer signatures={entity.signatures} onEntity={props.onEntity} />;
      case ZTypedocKind.Accessor:
        return <ZTypedocSignatureListViewer signatures={[].concat(entity.getSignature || []).concat(entity.setSignature || [])} onEntity={props.onEntity} />;
      case ZTypedocKind.Property:
        return <ZTypedocPropertyViewer property={entity} onEntity={props.onEntity} />;
      default:
        return <ZTypedocCommentViewer comment={entity.comment} />;
    }
  }

  /**
   * Creates the jsx for an individual group.
   *
   * @param group The group to create for.
   *
   * @returns The jsx that represents the group.
   */
  function createGroup(group: IZTypedocGroup) {
    const entities = group.children.map((id) => lookup[id]);

    return (
      <div className='ZTypedocEntityViewer-group' key={group.kind}>
        <div className='ZTypedocEntityViewer-group-header'>
          <Typography variant='h4'>{group.title}</Typography>
        </div>
        <hr />
        {entities.map((en) => (
          <div className={`ZTypedocEntityViewer-entity ZTypedocEntityViewer-entity-${en.kind}`} key={en.id}>
            <div className='ZTypedocEntityViewer-entity-header'>
              <ZTypedocIcon kind={en.kind} />
              <ZTypedocFlagsViewer flags={en.flags} />
              <span className='ZTypedocEntityViewer-entity-title'>{en.name}</span>
            </div>
            {createDocumentation(en)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <ZPaperCard
      className='ZTypedocEntityViewer-root'
      data-testid='ZTypedocEntityViewer-root'
      headerText={props.entity.name}
      action={props.action}
      avatar={<ZTypedocIcon kind={props.entity.kind} size='md' />}
      subHeaderText={props.entity.kindString}
      size='xl'
    >
      <ZTypedocFlagsViewer flags={props.entity.flags} />
      <ZTypedocCommentViewer comment={props.entity.comment} />

      {(props.entity.groups || []).map((gr) => createGroup(gr))}
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
