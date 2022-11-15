import { List } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { IZComponentStyle } from '../component/component-style';

/**
 * Represents properties for the ZList component.
 */
export interface IZList extends IZComponentHierarchy, IZComponentStyle {}

/**
 * Represents a vertical list component.
 *
 * @param props
 *        The properties for this list.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZList(props: IZList) {
  const { className, children } = props;
  const clasz = cssClass('ZList-root', className);

  return <List className={clasz}>{children}</List>;
}
