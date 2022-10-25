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
    'marginLeft': `-${theme.gap()}`,

    '>*': {
      marginLeft: `${theme.gap()} !important`
    }
  }
}));

export interface IZToolbarLayout extends IZComponentHierarchy, IZComponentStyle {}

/**
 * Represents a toolbar.
 *
 * @param props
 *        The properties for this toolbar.
 *
 * @returns
 *        The JSX to render the toolbar.
 */
export function ZToolbarLayout(props: IZToolbarLayout) {
  const { className, children } = props;

  const styles = useToolbarStyles();
  const toolbarClass = cssClass('ZToolbar-root', className, styles.classes.root);

  return <div className={toolbarClass}>{children}</div>;
}
