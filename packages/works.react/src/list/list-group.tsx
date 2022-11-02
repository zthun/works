import { ListSubheader } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHeading } from '../component/component-heading';
import { IZListItem } from './list-item';

/**
 * Represents the properties for a list group component.
 */
export interface IZListGroup extends IZListItem, Pick<IZComponentHeading, 'heading'> {}

/**
 * Represents a list item that sections off other list items.
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZListGroup(props: IZListGroup) {
  const { className, name, heading } = props;
  const clasz = cssClass('ZListItem-root', 'ZListItem-group', className);

  return (
    <ListSubheader sx={{ background: 'transparent' }} className={clasz} data-name={name}>
      {heading}
    </ListSubheader>
  );
}
