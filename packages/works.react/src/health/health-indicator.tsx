import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report';
import { Button } from '@mui/material';
import { ZSuspenseRotate, createStyleHook } from '@zthun/fashion-boutique';
import { white } from '@zthun/fashion-theme';
import React from 'react';
import { CSSObject } from 'tss-react';
import { useHealth } from './health-service';

const useHealthIndicatorStyles = createStyleHook(({ theme }) => {
  const { success, error } = theme;
  const icon: CSSObject = {
    backgroundColor: white(),
    borderRadius: '50%'
  };

  return {
    ok: {
      ...icon,
      color: success.main
    },
    warn: {
      ...icon,
      color: error.main
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

    return health
      ? 'The server is reporting healthy.'
      : 'The server is in an unhealthy state.  You will have to try again later.';
  }

  /**
   * Renders the state of the health.
   *
   * @returns The jsx for the health indicator
   */
  function renderHealth() {
    if (health === undefined) {
      return <ZSuspenseRotate />;
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
