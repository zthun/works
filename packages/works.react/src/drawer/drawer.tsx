import { Drawer } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { IZComponentStyle } from '../component/component-style.interface';

export interface IZDrawer extends IZComponentHierarchy, IZComponentStyle {
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  open: boolean;

  onClose(): void;
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
    <Drawer className={_className} anchor={anchor} open={open} onClose={onClose} transitionDuration={10}>
      {children}
    </Drawer>
  );
}
