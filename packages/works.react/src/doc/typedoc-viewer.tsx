import { Button, Typography } from '@mui/material';
import { IZTypedoc, IZTypedocEntity, IZTypedocGroup } from '@zthun/works.core';
import { Dictionary, kebabCase, keyBy, noop } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { ZPaperCard } from '../card/paper-card';
import { IZComponentActionable } from '../component/component-actionable.interface';
import { IZComponentEntityRedirect } from '../component/component-entity-redirect.interface';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZComponentSizeable } from '../component/component-sizeable.interface';
import { makeStyles } from '../theme/make-styles';
import { createTypedocTypography } from './typedoc-create-typography.function';
import { ZTypedocIcon } from './typedoc-icon';

/**
 * Represents the properties for the ZTypedocViewer component.
 */
export interface IZTypedocViewerProps extends Partial<IZComponentHeader>, IZComponentSizeable, IZComponentActionable, IZComponentEntityRedirect<IZTypedocEntity> {
  /**
   * The typedoc to display.
   */
  typedoc: IZTypedoc;
}

const useTypedocViewerStyles = makeStyles()((theme) => ({
  group: {
    marginBottom: theme.sizing.gaps.md
  },
  entities: {
    display: 'grid',
    gridTemplateColumns: 'auto',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'auto auto'
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto auto auto'
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'auto auto auto auto'
    }
  },
  title: {
    'fontSize': '1.2rem',
    'fontWeight': 'bold',
    'textTransform': 'uppercase',

    '&.MuiTypography-root': {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    }
  },

  entity: {
    '&.MuiButton-root': {
      display: 'flex',
      textTransform: 'none',
      textAlign: 'left',
      justifyContent: 'flex-start',
      padding: theme.sizing.gaps.none,
      paddingRight: theme.sizing.gaps.sm,
      marginTop: theme.sizing.gaps.xs,
      marginBottom: theme.sizing.gaps.xs,
      marginRight: theme.sizing.gaps.sm,
      cursor: 'pointer',
      color: theme.palette.primary.main
    },

    '&.ZTypedocViewer-entity-enumeration': {
      color: theme.palette.doc.enumeration
    },

    '&.ZTypedocViewer-entity-class': {
      color: theme.palette.doc.class
    },

    '&.ZTypedocViewer-entity-interface': {
      color: theme.palette.doc.interface
    },

    '&.ZTypedocViewer-entity-function': {
      color: theme.palette.doc.function
    },

    '&.ZTypedocViewer-entity-variable': {
      color: theme.palette.doc.variable
    },

    '&.ZTypedocViewer-entity-namespace': {
      color: theme.palette.doc.namespace
    },

    '&:hover': {
      color: theme.palette.info.main,
      backgroundColor: 'transparent'
    }
  }
}));

/**
 * Represents a viewer for typedoc json files.
 *
 * @param props The properties for this viewer.
 *
 * @returns The jsx for a typedoc viewer.
 */
export function ZTypedocViewer(props: IZTypedocViewerProps) {
  const { typedoc, headerText = 'Typedoc', subHeaderText, avatar, actionText, actionType = 'button', size, actionColor = 'primary', onAction = noop, onEntity } = props;
  const styles = useTypedocViewerStyles();
  const lookup = useMemo(() => createLookup(), [typedoc]);

  /**
   * Constructs a lookup table of the root typedoc children.
   *
   * @returns a lookup of the typedoc children by id.
   */
  function createLookup(): Dictionary<IZTypedocEntity> {
    return keyBy(typedoc.children, (ch) => ch.id);
  }

  /**
   * Occurs when an entity is clicked.
   *
   * @param entity The entity that was clicked.
   */
  function handleEntity(entity: IZTypedocEntity) {
    onEntity(entity);
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
        className={`ZTypedocViewer-entity ZTypedocViewer-entity-${kebabCase(en.kindString)} ${styles.classes.entity}`}
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
      <div className={`ZTypedocViewer-group ${styles.classes.group}`} data-testid={`ZTypedocViewer-group-${kebabCase(gr.title)}`} key={kebabCase(gr.title)}>
        <Typography className={`ZTypedocViewer-group-title ${styles.classes.title}`} data-testid='ZTypedocViewer-group-title' variant='h4'>
          {gr.title}
        </Typography>
        <hr />
        <div className={`ZTypedocViewer-group-entities ${styles.classes.entities}`}>{nodes}</div>
      </div>
    );
  }

  /**
   * Creates the component for the global typedoc object.
   *
   * @returns The jsx for the global typedoc object.
   */
  function createGlobal() {
    if (!typedoc.groups) {
      return createTypedocTypography('The documentation document is currently empty.  Check back later to see if this is corrected or contact support to notify them of this issue.', undefined, undefined, 'ZTypedocViewer-group-empty');
    }

    const nodes: ReactNode[] = typedoc.groups.map((gr) => createGroup(gr));
    return <React.Fragment>{nodes}</React.Fragment>;
  }

  return (
    <ZPaperCard className='ZTypedocViewer-root' headerText={headerText} subHeaderText={subHeaderText || typedoc?.name} avatar={avatar} size={size} actionText={actionText} actionType={actionType} actionColor={actionColor} onAction={onAction}>
      {createGlobal()}
    </ZPaperCard>
  );
}
