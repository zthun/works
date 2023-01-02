import { Drawer } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';
import { ZStateAnchor } from '../theme/state-anchor';

/**
 * Represents props for the drawer.
 */
export interface IZDrawer extends IZComponentHierarchy, IZComponentStyle {
  anchor?: ZStateAnchor;
  open: boolean;

  onClose?(): void;
}

/**
 * Represents a collapsible drawer.
 *
 * @param props
 *        The properties for this drawer.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZDrawer(props: IZDrawer) {
  const { className, children, anchor, open, onClose } = props;
  const _className = cssClass('ZDrawer-root', className);

  return (
    <Drawer className={_className} anchor={anchor} open={open} onClose={onClose} data-anchor={anchor}>
      {children}
    </Drawer>
  );
}
