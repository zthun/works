import { Alert, AlertTitle } from '@mui/material';
import React from 'react';
import { IZAlert } from './alert';
import { useAlertState } from './alert-stack.context';

/**
 * Renders a stack of alert messages from the global alert state list.
 *
 * @returns The jsx for the alert stack.
 *
 * @deprecated Use the alert list instead.
 */
export function ZAlertStackList() {
  const stack = useAlertState();

  /**
   * Closes the specific alert.
   *
   * @param alert The alert to remove.
   */
  function handleClose(alert: IZAlert) {
    stack.remove(alert);
  }

  const components = stack.list.map((alert) => {
    const handleCloseAlert = handleClose.bind(this, alert);
    return (
      <Alert className='ZAlertStackList-alert' data-testid='ZAlertStackList-alert' key={alert._id} severity={alert.severity} onClose={handleCloseAlert}>
        <AlertTitle>{alert.header}</AlertTitle>
        {alert.message}
      </Alert>
    );
  });

  return <div className='ZAlertStackList-root'>{components}</div>;
}
