import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { useAlertState } from './alert-stack.context';

export function ZAlertStackList() {
  const stack = useAlertState();

  const components = stack.list.map((alert) => {
    function handleClose() {
      stack.remove(alert);
    }

    return (
      <Alert className='ZAlertStackList-alert mb-sm' data-testid='ZAlertStackList-alert' variant='outlined' key={alert._id} severity={alert.severity} onClose={handleClose}>
        <AlertTitle>{alert.header}</AlertTitle>
        {alert.message}
      </Alert>
    );
  });

  return <div className='ZAlertStackList-root'>{components}</div>;
}
