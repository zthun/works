import { Typography } from '@material-ui/core';
import { IZTypedocEntity, IZTypedocGroup, ZTypedocKind } from '@zthun/works.core';
import { get, keyBy, noop } from 'lodash';
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
   * Creates the jsx for a default value.
   *
   * @param def The default value text.
   *
   * @returns The jsx for a default value.
   */
  function createDefault(def: string) {
    if (!def) {
      return null;
    }

    return <span className='ZTypedocEntityViewer-entity-default'>{def}</span>;
  }

  /**
   * Creates the documentation for a parameter list.
   *
   * @param params The parameters to document.
   *
   * @returns The jsx for the parameter list.
   */
  function createParameters(params: IZTypedocEntity[]) {
    if (!get(params, 'length')) {
      return null;
    }

    const createParam = (param: IZTypedocEntity) => {
      return (
        <div className='ZTypedocEntityViewer-entity-parameter' key={param.id}>
          <div className='ZTypedocEntityViewer-entity-parameter-header'>
            <span className='ZTypedocEntityViewer-entity-parameter-title'>{param.name}</span>
            <ZTypedocTypeViewer type={param.type} prefix=': ' />
            {createDefault(param.defaultValue)}
          </div>

          <ZTypedocCommentViewer comment={param.comment} />
        </div>
      );
    };

    return (
      <Fragment>
        <div className='ZTypedocEntityViewer-entity-category'>Parameters</div>
        {params.map((param) => createParam(param))}
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
      <div className='ZTypedocEntityViewer-entity-signature' key={signature.id}>
        <div className='ZTypedocEntityViewer-entity-signature-header'>
          <span>{signature.name}</span>
          <span>({params.map((param, i) => createSignatureParameter(param, i === params.length - 1))})</span>
          <ZTypedocTypeViewer type={signature.type} prefix=': ' onReference={props.onEntity} />
        </div>
        <ZTypedocCommentViewer comment={signature.comment} />
        {createParameters(signature.parameters)}
      </div>
    );
  }

  /**
   * Creates the jsx for a constructor.
   *
   * @param entity The entity to create the jsx for.
   *
   * @returns The jsx for a constructor entity.
   */
  function createMethod(entity: IZTypedocEntity) {
    return entity.signatures.map((sig) => createSignature(sig));
  }

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
        return createMethod(entity);
      default:
        return <ZTypedocCommentViewer comment={entity.comment} />;
    }
  }

  /**
   * Creates a child for a group.
   *
   * @param entity The entity to create the jsx for.
   *
   * @returns The jsx for the entity.
   */
  function createGroupChild(entity: IZTypedocEntity) {
    const clasz = `ZTypedocEntityViewer-sub-entity ZTypedocEntityViewer-sub-entity-${entity.kind}`;

    return (
      <div className={clasz} key={entity.id}>
        <div className='ZTypedocEntityViewer-entity-header'>
          <ZTypedocFlagsViewer flags={entity.flags} />
          <span className='ZTypedocEntityViewer-entity-title'>{entity.name}</span>
        </div>
        {createDocumentation(entity)}
      </div>
    );

    /*
            <ZTypedocTypeViewer type={entity.type} prefix=': ' onReference={props.onEntity} />
        <ZTypedocCommentViewer comment={entity.comment} />
     */
    /*
    switch (entity.kind) {
      default:
        return createSubEntity(entity);
    }*/
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
        <div className='ZTypedocEntityViewer-group-children'>{entities.map((en) => createGroupChild(en))}</div>
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
