import { Button, Typography } from '@material-ui/core';
import { IZTypedocGroup } from '@zthun/works.core';
import { kebabCase, keyBy, noop } from 'lodash';
import WarningIcon from '@material-ui/icons/Warning';
import React, { ReactNode } from 'react';
import { IZTypedocEntity } from '../../../works.core/dist/types';
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
  /**
   * Creates the message for empty typedoc.
   *
   * @returns The jsx for a falsy typedoc object.
   */
  function createEmptyTypedoc() {
    return (
      <div className='ZTypedocViewer-no-entity' data-testid='ZTypedocViewer-no-entity'>
        <WarningIcon className='ZTypedocViewer-no-entity-icon' fontSize='large' />
        <Typography variant='h4'>No typedoc has been loaded.</Typography>
      </div>
    );
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
        key={kebabCase(`${en.kindString}-${en.name}`)}
        disableRipple={true}
        startIcon={<ZTypedocIcon kind={en.kind} />}
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
    const lookup = keyBy(props.typedoc.children, (ch) => ch.id);
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

  /**
   * Creates the root typedoc element.
   *
   * @returns The jsx for the typedoc root.
   */
  function createTypedocContent() {
    if (props.loading) {
      return null;
    }

    if (props.typedoc == null) {
      return createEmptyTypedoc();
    }

    return createGlobal();
  }

  return (
    <ZPaperCard className='ZTypedocViewer-root' headerText={props.headerText} subHeaderText={props.subHeaderText || props.typedoc?.name} loading={props.loading} avatar={props.avatar} action={props.action} size={props.size}>
      {createTypedocContent()}
    </ZPaperCard>
  );
}

ZTypedocViewer.defaultProps = {
  headerText: 'API',
  avatar: null,
  onEntity: noop
};
