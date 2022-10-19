import { Alert, AlertTitle } from '@mui/material';
import { IZAlert } from '@zthun/works.message';
import React, { useEffect } from 'react';
import { useSafeState } from '../state/use-safe-state';
import { makeStyles } from '../theme/make-styles';
import { useAlertService } from './alert-service';

const useAlertStyles = makeStyles()((theme) => ({
  root: {
    position: 'fixed',
    top: '7.5rem',
    right: theme.spacing(2),
    maxWidth: '20rem'
  },
  alert: {
    marginBottom: theme.spacing()
  }
}));

/**
 * Renders a stack of alert messages from the global alert service.
 *
 * @returns The jsx for the alert stack.
 */
export function ZAlertList() {
  const [alerts, setAlerts] = useSafeState<IZAlert[]>([]);
  const service = useAlertService();
  const styles = useAlertStyles();

  useEffect(() => {
    service.all().then((alerts) => setAlerts(alerts));
    const subscription = service.watch().subscribe((alerts) => setAlerts(alerts));
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Closes the specific alert.
   *
   * @param alert
   *        The alert to remove.
   */
  function handleClose(alert: IZAlert) {
    service.remove(alert._id);
  }

  /**
   * Renders the alert header.
   *
   * @param alert
   *        The alert that contains the header to render.
   * @returns
   *        The JSX for the alert header.
   */
  function renderHeader(alert: IZAlert) {
    return alert.header ? <AlertTitle className='ZAlertList-alert-header'>{alert.header}</AlertTitle> : null;
  }

  const components = alerts.map((alert) => {
    const handleCloseAlert = handleClose.bind(this, alert);
    return (
      <div key={alert._id} className='ZAlertList-alert' data-alert-id={alert._id} data-alert-severity={alert.severity}>
        <Alert className={styles.classes.alert} severity={alert.severity} onClose={handleCloseAlert}>
          {renderHeader(alert)}
          <div className='ZAlertList-alert-message'>{alert.message}</div>
        </Alert>
      </div>
    );
  });

  return <div className={`ZAlertList-root ${styles.classes.root}`}>{components}</div>;
}
