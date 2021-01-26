import { Typography } from '@material-ui/core';
import { IZTypedocEntity, IZTypedocGroup, ZTypedocKind } from '@zthun/works.core';
import { noop } from 'lodash';
import React from 'react';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { IZTypedocGroupListViewerProps } from './typedoc-group-list-viewer.props';
import { ZTypedocIcon } from './typedoc-icon';
import { ZTypedocPropertyViewer } from './typedoc-property-viewer';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';

/**
 * Creates the jsx for the typedoc group list viewer.
 *
 * @param props The properties for the component.
 *
 * @returns The jsx that renders the group list.
 */
export function ZTypedocGroupListViewer(props: IZTypedocGroupListViewerProps) {
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
        return <ZTypedocSignatureListViewer signatures={entity.signatures} onEntity={props.onEntity} />;
      case ZTypedocKind.Accessor:
        return <ZTypedocSignatureListViewer signatures={[].concat(entity.getSignature || []).concat(entity.setSignature || [])} onEntity={props.onEntity} />;
      case ZTypedocKind.Property:
      case ZTypedocKind.EnumMember:
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
    const entities = group.children.map((id) => props.dictionary[id]);

    return (
      <div className='ZTypedocGroupListViewer-group' key={group.kind}>
        <div className='ZTypedocGroupListViewer-group-header'>
          <Typography variant='h4'>{group.title}</Typography>
        </div>
        <hr />
        {entities.map((en) => (
          <div className={`ZTypedocGroupListViewer-group-entity ZTypedocGroupListViewer-group-entity-${en.kind}`} key={en.id}>
            <div className='ZTypedocGroupListViewer-group-entity-header'>
              <ZTypedocIcon kind={en.kind} />
              <ZTypedocFlagsViewer flags={en.flags} />
              <span className='ZTypedocGroupListViewer-group-entity-title'>{en.name}</span>
            </div>
            {createDocumentation(en)}
          </div>
        ))}
      </div>
    );
  }

  return <div className='ZTypedocGroupListViewer-root'>{(props.groups || []).map((gr) => createGroup(gr))}</div>;
}

ZTypedocGroupListViewer.defaultProps = {
  onEntity: noop
};
