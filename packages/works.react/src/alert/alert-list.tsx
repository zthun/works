import { Alert, AlertTitle } from '@mui/material';
import { IZAlert } from '@zthun/works.message';
import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '../theme/make-styles';
import { useAlertService } from './alert-service.context';

const useAlertStyles = makeStyles()((theme) => ({
  root: {
    position: 'fixed',
    top: `calc(${theme.sizing.toolbar.md} + ${theme.sizing.gaps.md})`,
    right: theme.sizing.gaps.md,
    maxWidth: theme.sizing.alerts.md
  },
  alert: {
    marginBottom: theme.sizing.gaps.md
  }
}));

/**
 * Renders a stack of alert messages from the global alert service.
 *
 * @returns The jsx for the alert stack.
 */
export function ZAlertList() {
  const [alerts, setAlerts] = useState<IZAlert[]>([]);
  const service = useAlertService();
  const styles = useAlertStyles();

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
      <Alert className={`ZAlertList-alert ZAlertList-alert-${alert._id} ${styles.classes.alert}`} key={alert._id} severity={alert.severity} onClose={handleCloseAlert}>
        <AlertTitle>{alert.header}</AlertTitle>
        <div className='ZAlertList-alert-message'>{alert.message}</div>
      </Alert>
    );
  });

  return <div className={`ZAlertList-root ${styles.classes.root}`}>{components}</div>;
}
