import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { makeStyles } from '../theme/make-styles';

const useToolbarStyles = makeStyles()((theme) => ({
  root: {
    'display': 'flex',

    '.ZToolbar-item': {
      marginLeft: theme.sizing.gaps.md
    }
  }
}));

/**
 * Represents a toolbar.
 *
 * @param props
 *        The properties for this toolbar.
 *
 * @returns
 *        The JSX to render the toolbar.
 */
export function ZToolbar(props: IZComponentHierarchy) {
  const { children } = props;

  const styles = useToolbarStyles();

  return <div className={`ZToolbar-root ${styles.classes.root}`}>{children}</div>;
}
