import { cssClass } from '@zthun/works.core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IZButton, ZButton } from '../buttons/button';
import { IZComponentHeader } from '../component/component-header.interface';
import { IZToolbarItem } from './toolbar';

export interface IZToolbarItemRoute extends IZToolbarItem, IZComponentHeader, Omit<IZButton, 'onClick'>, Omit<IZButton, 'children'> {
  path: string;
}

/**
 * Represents a toolbar item that pushes route navigation history.
 *
 * @param props
 *        The properties for this route component.
 *
 * @returns
 *        The jsx to render this item.
 */
export function ZToolbarItemRoute(props: IZToolbarItemRoute) {
  const { className, headerText, path } = props;
  const itemClass = cssClass('ZToolbar-item', 'ZToolbarItemRoute-root', className);
  const navigate = useNavigate();

  /**
   * Routes the user to the specified path.
   */
  function handleRoute() {
    navigate(path);
  }

  return (
    <ZButton {...props} className={itemClass} onClick={handleRoute}>
      {headerText}
    </ZButton>
  );
}
