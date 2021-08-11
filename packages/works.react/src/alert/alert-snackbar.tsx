import { Snackbar } from '@material-ui/core';
import React from 'react';
import { ZAlertStackList } from './alert-stack-list';

/**
 * Represents the alert snackbar properties.
 */
export interface IZAlertSnackbarProps {
  /**
   * Vertical alignment.
   *
   * @default 'bottom'
   */
  vertical: 'top' | 'bottom';

  /**
   * Horizontal alignment.
   *
   * @default 'right'
   */
  horizontal: 'left' | 'center' | 'right';
}

/**
 * Represents a snackbar that renders the global alert stack.
 *
 * @param props The snackbar props.
 *
 * @returns The jsx for this component.
 */
export function ZAlertSnackbar(props: IZAlertSnackbarProps) {
  return (
    <Snackbar className='ZAlertSnackbar-root' open={true} anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}>
      <ZAlertStackList />
    </Snackbar>
  );
}

ZAlertSnackbar.defaultProps = {
  vertical: 'bottom',
  horizontal: 'right'
};
