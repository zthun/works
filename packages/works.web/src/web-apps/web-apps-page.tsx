import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SettingsIcon from '@mui/icons-material/Settings';
import StartIcon from '@mui/icons-material/Start';
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles, useNavigate, ZMenu, ZMenuItem, ZNavigate, ZRoute, ZRouteMap, ZToolbar } from '@zthun/works.react';
import React from 'react';
import { ZButton } from '../../../works.react/src/buttons/button';
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
  const navigate = useNavigate();

  return (
    <div className='ZWebAppsPage-root'>
      <ZToolbar className={styles.classes.toolbar}>
        <ZButton avatar={<StartIcon color='success' />} color='info' outline onClick={navigate.bind(null, 'getting-started')}>
          Getting Started
        </ZButton>
        <ZMenu avatar={<SettingsIcon color='primary' />} color='info' outline headerText='Components'>
          <ZMenuItem avatar={<WarningIcon color='warning' />} onClick={navigate.bind(null, 'components/alerts')}>
            Alerts
          </ZMenuItem>
        </ZMenu>
        <ZMenu avatar={<ElectricalServicesIcon color='warning' />} color='info' outline headerText='Services'>
          <ZMenuItem avatar={<MedicalServicesIcon color='success' />}>Health</ZMenuItem>
        </ZMenu>
      </ZToolbar>

      <ZRouteMap>
        <ZRoute path='getting-started' element={<ZGettingStartedPage />} />
        <ZRoute path='components'>
          <ZRoute path='alerts' element={<ZAlertsPage />} />
        </ZRoute>
        <ZRoute path='/' element={<ZNavigate to='getting-started' />} />
        <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
      </ZRouteMap>
    </div>
  );
}
