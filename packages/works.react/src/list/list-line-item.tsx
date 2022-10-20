import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentAdornment } from '../component/component-adornment';
import { IZComponentAvatar } from '../component/component-avatar';
import { IZComponentDisabled } from '../component/component-disabled';
import { IZComponentHeading } from '../component/component-heading';
import { IZComponentStyle } from '../component/component-style.';
import { makeStyles } from '../theme/make-styles';

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

const useListLineItemStyles = makeStyles<IZListLineItem>()((theme, props) => {
  const gap = props.onClick ? 0 : theme.gap();

  return {
    avatar: {
      marginLeft: gap
    }
  };
});

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
  const clasz = cssClass('ZListItem-root', 'ZListLineItem-root', className);
  const { classes } = useListLineItemStyles(props);

  const renderContents = () => {
    const avatarClass = cssClass('ZListLineItem-avatar', classes.avatar);
    return (
      <>
        <ListItemAvatar className={avatarClass}>{avatar}</ListItemAvatar>
        <ListItemText className='ZListLineItem-text' primary={heading} secondary={subHeading} />
      </>
    );
  };

  const renderClickableContents = () => (
    <ListItemButton className='ZListLineItem-button' onClick={onClick}>
      {renderContents()}
    </ListItemButton>
  );

  return (
    <ListItem className={clasz} secondaryAction={adornment}>
      {onClick ? renderClickableContents() : renderContents()}
    </ListItem>
  );
}
