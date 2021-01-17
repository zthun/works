import { Typography } from '@material-ui/core';
import { IZTypedocEntity, IZTypedocGroup } from '@zthun/works.core';
import { keyBy, noop } from 'lodash';
import React, { Fragment } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { ZTypedocCommentViewer } from './typedoc-comment-viewer';
import { IZTypedocEntityViewerProps } from './typedoc-entity-viewer.props';
import { ZTypedocFlagsViewer } from './typedoc-flags-viewer';
import { ZTypedocIcon } from './typedoc-icon';
import { ZTypedocTypeViewer } from './typedoc-type-viewer';

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
   * Creates the jsx for the parameter list.
   *
   * @param parameter The parameter to create the jsx for.
   * @param last A flag that indicates if the parameter is the last parameter.
   *
   * @returns The jsx for the parameter list.
   */
  function createSignatureParameter(parameter: IZTypedocEntity, last: boolean) {
    return (
      <Fragment key={parameter.id}>
        {parameter.name}
        <ZTypedocTypeViewer type={parameter.type} prefix=': ' onReference={props.onEntity} />
        {last ? null : ', '}
      </Fragment>
    );
  }

  /**
   * Creates the jsx for a signature.
   *
   * @param signature The signature entity.
   *
   * @returns The jsx for the signature.
   */
  function createSignature(signature: IZTypedocEntity) {
    const params = signature.parameters || [];
    return (
      <Fragment key={signature.id}>
        <div className='ZTypedocEntityViewer-sub-entity ZTypedocEntityViewer-signature'>
          <span className='ZTypedocEntityViewer-entity-title'>{signature.name}</span>
          <span>({params.map((param, i) => createSignatureParameter(param, i === params.length - 1))})</span>
          <ZTypedocTypeViewer type={signature.type} prefix=': ' onReference={props.onEntity} />
          <ZTypedocCommentViewer comment={signature.comment} />
        </div>
      </Fragment>
    );
  }

  /**
   * Creates the jsx for an individual section.
   *
   * @param entity The entity to create the jsx for.
   *
   * @returns The jsx for the section.
   */
  function createSubEntity(entity: IZTypedocEntity) {
    return (
      <Fragment key={entity.id}>
        <div className='ZTypedocEntityViewer-sub-entity'>
          <ZTypedocFlagsViewer flags={entity.flags} />
          <span className='ZTypedocEntityViewer-entity-title'>{entity.name}</span>
          <ZTypedocTypeViewer type={entity.type} prefix=': ' onReference={props.onEntity} />
          <ZTypedocCommentViewer comment={entity.comment} />
        </div>
      </Fragment>
    );
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
          <ZTypedocIcon kind={group.kind} />
          <Typography variant='h4'>{group.title}</Typography>
        </div>
        <hr />
        <div className='ZTypedocEntityViewer-group-children'>{entities.map((en) => (en.signatures ? en.signatures.map((sig) => createSignature(sig)) : createSubEntity(en)))}</div>
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
