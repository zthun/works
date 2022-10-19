import { List } from '@mui/material';
import React from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy';

/**
 * Represents a vertical list component.
 *
 * @param props
 *        The properties for this list.
 *
 * @returns
 *        The JSX to render this component.
 */
export function ZList(props: IZComponentHierarchy) {
  const { children } = props;

  return <List className='ZList-root'>{children}</List>;
}
