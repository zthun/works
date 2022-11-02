import { Divider } from '@mui/material';
import { cssClass } from '@zthun/works.core';
import React from 'react';
import { IZListItem } from './list-item';

/**
 * Represents a simple list divider
 *
 * @param props
 *        The properties for this component.
 *
 * @returns
 *        The JSX to render the divider.
 */
export function ZListDivider(props: IZListItem) {
  const { className, name } = props;
  const clasz = cssClass('ZListItem-root', 'ZListItem-divider', className);

  return <Divider className={clasz} data-name={name} />;
}
