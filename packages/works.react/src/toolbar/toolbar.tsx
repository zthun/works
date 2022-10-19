import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style.';
import { makeStyles } from '../theme/make-styles';

const useToolbarStyles = makeStyles()((theme) => ({
  root: {
    'display': 'flex',
    'alignItems': 'center',
    'flexWrap': 'nowrap',
    'marginLeft': `-${theme.spacing()}`,

    '>*': {
      marginLeft: `${theme.spacing()} !important`
    }
  }
}));

export interface IZToolbar extends IZComponentHierarchy, IZComponentStyle {}

/**
 * Represents a toolbar.
 *
 * @param props
 *        The properties for this toolbar.
 *
 * @returns
 *        The JSX to render the toolbar.
 */
export function ZToolbar(props: IZToolbar) {
  const { className, children } = props;

  const styles = useToolbarStyles();
  const toolbarClass = cssClass('ZToolbar-root', className, styles.classes.root);

  return <div className={toolbarClass}>{children}</div>;
}
