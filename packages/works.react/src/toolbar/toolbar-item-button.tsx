import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZButton, ZButton } from '../buttons/button';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZToolbarItem } from './toolbar';

export interface IZToolbarItemButton extends IZToolbarItem, IZComponentHeader, Omit<IZButton, 'children'> {}

/**
 * Represents a toolbar item that contains a button.
 *
 * @param props
 *        The properties for this toolbar item.
 *
 * @returns
 *        The JSX used to render this button.
 */
export function ZToolbarItemButton(props: IZToolbarItemButton) {
  const { className, headerText } = props;

  const buttonClass = cssClass('ZToolbar-item', 'ZToolbarItemButton-root', className);

  return (
    <ZButton {...props} className={buttonClass}>
      {headerText}
    </ZButton>
  );
}
