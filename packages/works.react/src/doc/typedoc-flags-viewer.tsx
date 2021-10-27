import { Typography } from '@mui/material';
import { IZTypedocFlags } from '@zthun/works.core';
import React, { ReactNode } from 'react';
import { shade } from '../theme/shade';
import { makeStyles } from '../theme/make-styles';

/**
 * Represents the properties for the ZTypedocFlagsViewer component.
 */
export interface IZTypedocFlagsViewerProps {
  /**
   * The flags to display.
   */
  flags: IZTypedocFlags;
}

const useTypedocFlagsViewerStyles = makeStyles()((theme) => {
  const darken = -21;

  return {
    root: {
      display: 'inline-flex'
    },

    flag: {
      'marginRight': theme.sizing.gaps.sm,
      'paddingLeft': theme.sizing.gaps.sm,
      'paddingRight': theme.sizing.gaps.sm,
      'color': theme.palette.common.white,
      'backgroundColor': theme.palette.doc.flags.general,
      'border': `${theme.sizing.thickness.xs} solid ${shade(theme.palette.doc.flags.general, darken)}`,

      '&:last-child': {
        marginRight: theme.sizing.gaps.none
      },

      '&.ZTypedocFlagsViewer-flag-abstract': {
        backgroundColor: theme.palette.doc.flags.abstract,
        borderColor: shade(theme.palette.doc.flags.abstract, darken)
      },

      '&.ZTypedocFlagsViewer-flag-static': {
        backgroundColor: theme.palette.doc.flags.static,
        borderColor: shade(theme.palette.doc.flags.static, darken)
      },

      '&.ZTypedocFlagsViewer-flag-readonly': {
        backgroundColor: theme.palette.doc.flags.readonly,
        borderColor: shade(theme.palette.doc.flags.readonly, darken)
      },

      '&.ZTypedocFlagsViewer-flag-const': {
        backgroundColor: theme.palette.doc.flags.const,
        borderColor: shade(theme.palette.doc.flags.const, darken)
      },

      '&.ZTypedocFlagsViewer-flag-protected': {
        backgroundColor: theme.palette.doc.flags.protected,
        borderColor: shade(theme.palette.doc.flags.protected, darken)
      },

      '&.ZTypedocFlagsViewer-flag-private': {
        backgroundColor: theme.palette.doc.flags.private,
        borderColor: shade(theme.palette.doc.flags.private, darken)
      },

      '&.ZTypedocFlagsViewer-flag-rest': {
        backgroundColor: theme.palette.doc.flags.rest,
        borderColor: shade(theme.palette.doc.flags.rest, darken)
      }
    }
  };
});

/**
 * Renders the view for typedoc flags.
 *
 * @param props The properties for this component.
 *
 * @returns The jsx for rendering the flags.
 */
export function ZTypedocFlagsViewer(props: IZTypedocFlagsViewerProps) {
  let { flags } = props;
  const styles = useTypedocFlagsViewerStyles();

  /**
   * Creates the jsx for a flag.
   *
   * @param text The text of the flag.
   * @param color The flag color.
   *
   * @returns The jsx for the flag.
   */
  function createFlag(text: string) {
    const id = text.toLowerCase();
    const clasz = `ZTypedocFlagsViewer-flag-${id}`;

    return (
      <Typography key={id} className={`ZTypedocFlagsViewer-flag ${styles.classes.flag} ${clasz}`} data-testid={clasz} variant='body2' component='span'>
        {text}
      </Typography>
    );
  }

  flags = flags || {};
  const buttons: ReactNode[] = [];

  if (flags.isAbstract) {
    buttons.push(createFlag('Abstract'));
  }

  if (flags.isConst) {
    buttons.push(createFlag('Const'));
  }

  if (flags.isStatic) {
    buttons.push(createFlag('Static'));
  }

  if (flags.isReadonly) {
    buttons.push(createFlag('Readonly'));
  }

  if (flags.isProtected) {
    buttons.push(createFlag('Protected'));
  }

  if (flags.isPrivate) {
    buttons.push(createFlag('Private'));
  }

  if (flags.isRest) {
    buttons.push(createFlag('Rest'));
  }

  if (flags.isOptional) {
    buttons.push(createFlag('Optional'));
  }

  return buttons.length ? <div className={`ZTypedocFlagsViewer-root ${styles.classes.root}`}>{buttons}</div> : null;
}
