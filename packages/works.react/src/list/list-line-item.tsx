import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentAdornment } from '../component/component-adornment';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentHeading } from '../component/component-heading';
import { IZComponentStyle } from '../component/component-style.';

/**
 * The props for the line item list.
 */
export interface IZListLineItem
  extends IZComponentHeading,
    IZComponentAdornment,
    IZComponentAvatar,
    IZComponentDisabled,
    IZComponentStyle {
  /**
   * Occurs when the line item is clicked.
   */
  onClick?: () => any;
}

/**
 * Represents a clickable line item with support for a given header, description, and adornment.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this item.
 */
export function ZListLineItem(props: IZListLineItem) {
  const { className, adornment, avatar, heading, subHeading, onClick } = props;
  const clasz = cssClass('ZListLineItem-root', className);

  return (
    <ListItem className={clasz} secondaryAction={adornment}>
      <ListItemButton className='ZListLineItem-button' onClick={onClick}>
        <ListItemAvatar>{avatar}</ListItemAvatar>
        <ListItemText primary={heading} secondary={subHeading} />
      </ListItemButton>
    </ListItem>
  );
}
