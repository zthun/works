import { IZTypedocEntity, IZTypedocGroup } from '@zthun/works.core';
import { keyBy, noop } from 'lodash';
import React from 'react';
import { ZPaperCard } from '../card/paper-card';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { makeStyles } from '../theme/make-styles';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocIcon } from './typedoc-icon';
import { ZTypedocSignatureListViewer } from './typedoc-signature-list-viewer';

/**
 * Represents the properties for the ZTypedocEntityViewer.
 */
export interface IZTypedocEntityViewerProps extends IZComponentSizeable, IZComponentActionable, IZComponentEntityRedirect<number> {
  /**
   * The entity to display information about.
   */
  entity: IZTypedocEntity;
}

const useTypedocEntityViewerStyles = makeStyles()((theme) => ({
  group: {
    'paddingBottom': theme.sizing.gaps.md,
    'paddingTop': theme.sizing.gaps.md,

    '.ZTypedocSignatureListViewer-root': {
      'marginBottom': theme.sizing.gaps.lg,

      '&:last-child': {
        marginBottom: theme.sizing.gaps.none
      }
    }
  },

  header: {
    display: 'flex',
    flexWrap: 'nowrap',

    h4: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      flexGrow: 1,
      paddingLeft: theme.sizing.gaps.xs
    }
  }
}));

/**
 * Represents a viewer for a typedoc entity.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx that displays the entity information.
 */
export function ZTypedocEntityViewer(props: IZTypedocEntityViewerProps) {
  const { entity, actionText, actionType = 'button', actionColor = 'primary', size = 'auto', onAction = noop, onEntity } = props;
  const styles = useTypedocEntityViewerStyles();

  /**
   * Creates the jsx for an individual group.
   *
   * @param group The group to create for.
   *
   * @returns The jsx that represents the group.
   */
  function createGroup(group: IZTypedocGroup) {
    const dict = keyBy(entity.children, (ch) => ch.id);
    const entities = group.children.map((id) => dict[id]).filter((en) => !!en);

    return (
      <div className={`ZTypedocEntityViewer-group ${styles.classes.group}`} key={group.kind}>
        <div className={`ZTypedocEntityViewer-group-header ${styles.classes.header}`}>{createTypedocTypography(group.title, 'h4', 'h4')}</div>
        <hr />
        {entities.map((en) => (
          <ZTypedocSignatureListViewer key={en.id} owner={en} signatures={[en]} onEntity={onEntity} />
        ))}
      </div>
    );
  }

  return (
    <ZPaperCard
      className='ZTypedocEntityViewer-root'
      data-testid='ZTypedocEntityViewer-root'
      headerText={entity.name}
      subHeaderText={entity.kindString}
      avatar={<ZTypedocIcon kind={entity.kind} size='md' />}
      size={size}
      actionText={actionText}
      actionType={actionType}
      actionColor={actionColor}
      onAction={onAction}
    >
      <ZTypedocSignatureListViewer owner={entity} signatures={[entity]} onEntity={onEntity} />
      {(entity.groups || []).map((gr) => createGroup(gr))}
    </ZPaperCard>
  );
}
