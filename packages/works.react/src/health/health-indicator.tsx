import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import { Button } from '@mui/material';
import React from 'react';
import { CSSObject } from 'tss-react';
import { ZCircularProgress } from '../loading/circular-progress';
import { makeStyles } from '../theme/make-styles';
import { useHealth } from './health-service.context';

const useHealthIndicatorStyles = makeStyles()((theme) => {
  const icon: CSSObject = {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.rounding.circle
  };

  return {
    ok: {
      ...icon,
      color: theme.palette.success.light
    },
    warn: {
      ...icon,
      color: theme.palette.error.light
    }
  };
});

/**
 * Represents the health indicator for the given application.
 *
 * @returns The jsx for the health indicator.
 */
export function ZHealthIndicator() {
  const [health, refresh] = useHealth();
  const styles = useHealthIndicatorStyles();

  /**
   * Renders the current tooltip.
   *
   * @returns The tooltip for the indicator.
   */
  function renderTooltip() {
    if (health === undefined) {
      return undefined;
    }

    return health ? 'The server is reporting healthy.' : 'The server is in an unhealthy state.  You will have to try again later.';
  }

  /**
   * Renders the state of the health.
   *
   * @returns The jsx for the health indicator
   */
  function renderHealth() {
    if (health === undefined) {
      return <ZCircularProgress show />;
    }

    const clasz = health ? `ZHealthIndicator-ok ${styles.classes.ok}` : `ZHealthIndicator-warn ${styles.classes.warn}`;
    return health ? <CheckCircleIcon className={clasz} /> : <ReportIcon className={clasz} />;
  }

  return (
    <Button className='ZHealthIndicator-root' title={renderTooltip()} color='inherit' onClick={refresh}>
      {renderHealth()}
    </Button>
  );
}
