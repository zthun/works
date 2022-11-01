import { MenuItem } from '@mui/material';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass } from '@zthun/works.core';
import { noop } from 'lodash';
import React from 'react';
import { IZButton } from '../buttons/button';
import { ZGridLayout } from '../layout/grid-layout';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { ZMenuEvent } from './menu-event';

export interface IZMenuItem extends Omit<IZButton, 'color'>, Omit<IZButton, 'outline'> {}

/**
 * Represents a menu item in a menu.
 *
 * @param props
 *        The properties for this menu item.
 *
 * @returns
 *        The JSX that renders the menu.
 */
export function ZMenuItem(props: IZMenuItem) {
  const { avatar, className, label, loading, onClick = noop } = props;

  const menuItemClass = cssClass('ZMenuItem-root', className);

  /**
   * Handles when this menu item is clicked.
   *
   * @param e The mouse event for the click
   */
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.dispatchEvent(ZMenuEvent.itemClick(e.currentTarget));
    onClick(e);
  }

  return (
    <MenuItem {...props} className={menuItemClass} onClick={handleClick}>
      <ZGridLayout alignItems='center' columns='auto 1fr auto' gap={ZSizeFixed.Small}>
        {avatar}
        <div className='ZMenuItem-content'>{label}</div>
        <ZSuspenseRotate width={ZSizeFixed.ExtraSmall} loading={!!loading} />
      </ZGridLayout>
    </MenuItem>
  );
}
