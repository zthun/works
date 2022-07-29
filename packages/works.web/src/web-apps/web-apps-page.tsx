import StartIcon from '@mui/icons-material/Start';
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles, ZNavigate, ZRoute, ZRouteMap, ZToolbar, ZToolbarItemRoute } from '@zthun/works.react';
import React from 'react';
import { ZAlertsPage } from './components/alerts/alerts-page';
import { ZGettingStartedPage } from './getting-started/getting-started-page';

const useWebAppPageStyles = makeStyles()((theme) => ({
  toolbar: {
    marginBottom: theme.sizing.gaps.md
  }
}));

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZWebAppsPage() {
  const styles = useWebAppPageStyles();

  return (
    <div className='ZWebAppsPage-root'>
      <ZToolbar className={styles.classes.toolbar}>
        <ZToolbarItemRoute avatar={<StartIcon color='success' />} color='info' outline headerText='Getting Started' subHeaderText='Where do I begin?' path='getting-started' />
        <ZToolbarItemRoute avatar={<WarningIcon color='warning' />} color='info' outline headerText='Alerts' subHeaderText='Notify users' path='alerts' />
      </ZToolbar>

      <ZRouteMap>
        <ZRoute path='getting-started' element={<ZGettingStartedPage />} />
        <ZRoute path='alerts' element={<ZAlertsPage />} />
        <ZRoute path='/' element={<ZNavigate to='getting-started' />} />
        <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
      </ZRouteMap>
    </div>
  );
}
