import { Snackbar } from '@mui/material';
import React, { forwardRef } from 'react';
import { ZAlertList } from './alert-list';

/**
 * Represents the alert snackbar properties.
 */
export interface IZAlertSnackbarProps {
  /**
   * Vertical alignment.
   *
   * @default 'bottom'
   */
  vertical?: 'top' | 'bottom';

  /**
   * Horizontal alignment.
   *
   * @default 'right'
   */
  horizontal?: 'left' | 'center' | 'right';
}

/**
 * Represents a snackbar that renders the global alert stack.
 *
 * @param props The snackbar props.
 *
 * @returns The jsx for this component.
 */
export function ZAlertSnackbar(props: IZAlertSnackbarProps) {
  const { vertical = 'bottom', horizontal = 'right' } = props;

  const Alerts = forwardRef(() => <ZAlertList />);

  return (
    <Snackbar className='ZAlertSnackbar-root' open anchorOrigin={{ vertical, horizontal }}>
      <Alerts />
    </Snackbar>
  );
}
