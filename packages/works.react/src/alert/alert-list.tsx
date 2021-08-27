import { Alert, AlertTitle } from '@material-ui/lab';
import { IZAlert } from '@zthun/works.message';
import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useAlertService } from './alert-service.context';

/**
 * Renders a stack of alert messages from the global alert service.
 *
 * @returns The jsx for the alert stack.
 */
export function ZAlertList() {
  const [alerts, setAlerts] = useState([]);
  const service = useAlertService();

  useEffect(() => {
    let _setAlerts = setAlerts;

    service.all().then((alerts) => _setAlerts(alerts));
    const subscription = service.watch().subscribe((alerts) => setAlerts(alerts));

    return () => {
      _setAlerts = noop;
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Closes the specific alert.
   *
   * @param alert The alert to remove.
   */
  function handleClose(alert: IZAlert) {
    service.remove(alert._id);
  }

  const components = alerts.map((alert) => {
    const handleCloseAlert = handleClose.bind(this, alert);
    return (
      <Alert className={`ZAlertList-alert ZAlertList-alert-${alert._id}`} key={alert._id} severity={alert.severity} onClose={handleCloseAlert}>
        <AlertTitle>{alert.header}</AlertTitle>
        {alert.message}
      </Alert>
    );
  });

  return <div className='ZAlertList-root'>{components}</div>;
}
