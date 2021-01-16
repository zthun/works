import { Button, Typography } from '@material-ui/core';
import { IZTypedocEntity, IZTypedocGroup } from '@zthun/works.core';
import { Dictionary, kebabCase, keyBy, noop } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { ZTypedocIcon } from './typedoc-icon';
import { IZTypedocViewerProps } from './typedoc-viewer.props';

/**
 * Represents a viewer for typedoc json files.
 *
 * @param props The properties for this viewer.
 *
 * @returns The jsx for a typedoc viewer.
 */
export function ZTypedocViewer(props: IZTypedocViewerProps) {
  const lookup = useMemo(() => createLookup(), [props.typedoc]);

  /**
   * Constructs a lookup table of the root typedoc children.
   *
   * @returns a lookup of the typedoc children by id.
   */
  function createLookup(): Dictionary<IZTypedocEntity> {
    return keyBy(props.typedoc.children, (ch) => ch.id);
  }

  /**
   * Occurs when an entity is clicked.
   *
   * @param entity The entity that was clicked.
   */
  function handleEntity(entity: IZTypedocEntity) {
    props.onEntity(entity);
  }

  /**
   * Creates the component for an entity.
   *
   * @param en The entity to create.
   *
   * @returns The jsx for the entity.
   */
  function createEntity(en: IZTypedocEntity) {
    return (
      <Button
        className={`ZTypedocViewer-entity ZTypedocViewer-entity-${kebabCase(en.kindString)}`}
        data-testid={`ZTypedocViewer-entity-${en.id}`}
        data-entity={en.id}
        key={kebabCase(`${en.kindString}-${en.name}`)}
        disableRipple={true}
        startIcon={<ZTypedocIcon kind={en.kind} />}
        onClick={handleEntity.bind(null, en)}
      >
        {en.name}
      </Button>
    );
  }

  /**
   * Creates the component for a group.
   *
   * @param gr The group to generate the component for.
   *
   * @returns The jsx for the group component.
   */
  function createGroup(gr: IZTypedocGroup) {
    const entities: IZTypedocEntity[] = gr.children.map((eid) => lookup[eid]);
    const nodes: ReactNode[] = entities.map(createEntity);
    return (
      <div className='ZTypedocViewer-group' data-testid={`ZTypedocViewer-group-${kebabCase(gr.title)}`} key={kebabCase(gr.title)}>
        <Typography className='ZTypedocViewer-group-title' data-testid='ZTypedocViewer-group-title' variant='h4'>
          {gr.title}
        </Typography>
        <hr />
        <div className='ZTypedocViewer-group-entities'>{nodes}</div>
      </div>
    );
  }

  /**
   * Creates the component for the global typedoc object.
   *
   * @returns The jsx for the global typedoc object.
   */
  function createGlobal() {
    const nodes: ReactNode[] = props.typedoc.groups.map((gr) => createGroup(gr));
    return <React.Fragment>{nodes}</React.Fragment>;
  }

  return (
    <ZPaperCard className='ZTypedocViewer-root' headerText={props.headerText} subHeaderText={props.subHeaderText || props.typedoc?.name} avatar={props.avatar} action={props.action} size={props.size}>
      {createGlobal()}
    </ZPaperCard>
  );
}

ZTypedocViewer.defaultProps = {
  headerText: 'API',
  avatar: null,
  onEntity: noop
};
