import { Typography } from '@material-ui/core';
import { IZTypedocComment, IZTypedocEntity, IZTypedocGroup } from '@zthun/works.core';
import { keyBy, noop } from 'lodash';
import React, { Fragment } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { IZTypedocEntityViewerProps } from './typedoc-entity-viewer.props';
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
   * Creates the jsx for comment paragraphs.
   *
   * @param comment The comment to create the jsx for.
   * @param shortText A flag on whether to show the short text.
   * @param text A flag on whether to show the full text.
   *
   * @returns The jsx for the comment fragment.
   */
  function createComment(comment: IZTypedocComment) {
    if (!comment) {
      return null;
    }

    const short = comment.shortText ? (
      <Typography className='ZTypedocEntityViewer-comment-short' variant='body2'>
        {comment.shortText}
      </Typography>
    ) : null;

    const long = comment.text ? (
      <Typography className='ZTypedocEntityViewer-comment-text' variant='body2'>
        {comment.text}
      </Typography>
    ) : null;

    return (
      <Fragment>
        {short}
        {long}
      </Fragment>
    );
  }

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
        <ZTypedocTypeViewer type={parameter.type} header=': ' onReference={props.onEntity} />
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
          <ZTypedocTypeViewer type={signature.type} header=': ' onReference={props.onEntity} />
        </div>
        {createComment(signature.comment)}
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
          <span className='ZTypedocEntityViewer-entity-title'>{entity.name}</span>
          <ZTypedocTypeViewer type={entity.type} header=': ' onReference={props.onEntity} />
        </div>
        {createComment(entity.comment)}
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
      <ZPaperCard key={group.title} className='ZTypedocEntityViewer-group' headerText={group.title} avatar={<ZTypedocIcon kind={group.kind} size='md' />} size='lg'>
        {entities.map((en) => (en.signatures ? en.signatures.map((sig) => createSignature(sig)) : createSubEntity(en)))}
      </ZPaperCard>
    );
  }

  return (
    <Fragment>
      <div className='ZTypedocEntityViewer-root' data-testid='ZTypedocEntityViewer-root'>
        <ZPaperCard headerText={props.entity.name} action={props.action} avatar={<ZTypedocIcon kind={props.entity.kind} size='md' />} subHeaderText={props.entity.kindString} size='lg'>
          {createComment(props.entity.comment)}
        </ZPaperCard>

        {(props.entity.groups || []).map((gr) => createGroup(gr))}
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
