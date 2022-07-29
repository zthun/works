import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentDisabled } from '../component/component-disabled.interface';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentLoading } from '../component/component-loading.interface';
import { IZComponentStyle } from '../component/component-style.interface';
import { makeStyles } from '../theme/make-styles';

const useToolbarStyles = makeStyles()((theme) => ({
  root: {
    'display': 'flex',

    '.ZToolbar-item': {
      'display': 'flex',
      'alignItems': 'center',
      'flexWrap': 'nowrap',
      'marginLeft': theme.sizing.gaps.md,

      ':first-of-type': {
        marginLeft: theme.sizing.gaps.none
      }
    }
  }
}));

export interface IZToolbarItem extends IZComponentDisabled, IZComponentLoading {}

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
