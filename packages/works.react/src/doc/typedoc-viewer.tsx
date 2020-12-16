import { Button, Typography } from '@material-ui/core';
import { IZTypedocGroup } from '@zthun/works.core';
import { kebabCase, keyBy } from 'lodash';
import React, { ReactNode } from 'react';
import { IZTypedocEntity } from '../../../works.core/dist/types';
import { ZPaperCard } from '../card/paper-card';
import { ZCircularProgress } from '../loading/circular-progress';
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
   * Creates the loading icon.
   *
   * @returns The jsx for the loading component.
   */
  function createLoading() {
    return <ZCircularProgress show={true} size='4em' />;
  }

  /**
   * Creates the message for empty typedoc.
   *
   * @returns The jsx for a falsy typedoc object.
   */
  function createEmptyTypedoc() {
    return (
      <Typography variant='h4' color='secondary'>
        No typedoc has been loaded.
      </Typography>
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
      <Button className={`ZTypedocViewer-entity ZTypedocViewer-entity-${kebabCase(en.kindString)}`} data-testid={`ZTypedocViewer-entity-${en.id}`} key={kebabCase(`${en.kindString}-${en.name}`)} disableRipple={true}>
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
      <div className='ZTypedocViewer-group' key={kebabCase(gr.title)}>
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
      return createLoading();
    }

    if (props.typedoc == null) {
      return createEmptyTypedoc();
    }

    return createGlobal();
  }

  return (
    <ZPaperCard className='ZTypedocViewer-root' headerText={props.headerText} subHeaderText={props.subHeaderText || props.typedoc?.name} avatar={props.avatar} action={props.action} size={props.size}>
      {createTypedocContent()}
    </ZPaperCard>
  );
}

ZTypedocViewer.defaultProps = {
  headerText: 'API',
  avatar: null
};
