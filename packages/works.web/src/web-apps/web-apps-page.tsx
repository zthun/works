import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import StartIcon from '@mui/icons-material/Start';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles, useNavigate, ZButton, ZMenu, ZMenuItem, ZNavigate, ZRoute, ZRouteMap, ZStateColor, ZToolbar } from '@zthun/works.react';
import React from 'react';
import { ZAlertsPage } from './components/alerts/alerts-page';
import { ZBooleanPage } from './components/boolean/boolean-page';
import { ZButtonPage } from './components/button/button-page';
import { ZChoicePage } from './components/choice/choice-page';
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
        <ZButton avatar={<StartIcon color='success' />} color={ZStateColor.Info} outline onClick={navigate.bind(null, 'getting-started')}>
          Getting Started
        </ZButton>
        <ZMenu avatar={<SettingsIcon color='primary' />} color={ZStateColor.Info} outline headerText='Components'>
          <ZMenuItem avatar={<WarningIcon color='warning' />} onClick={navigate.bind(null, 'components/alerts')}>
            Alerts
          </ZMenuItem>
          <ZMenuItem avatar={<CheckBoxIcon color='success' />} onClick={navigate.bind(null, 'components/boolean')}>
            Boolean
          </ZMenuItem>
          <ZMenuItem avatar={<SmartButtonIcon color='error' />} onClick={navigate.bind(null, 'components/button')}>
            Button
          </ZMenuItem>
          <ZMenuItem avatar={<TouchAppIcon color='warning' />} onClick={navigate.bind(null, 'components/choice')}>
            Choice
          </ZMenuItem>
        </ZMenu>
        <ZMenu avatar={<ElectricalServicesIcon color='warning' />} color={ZStateColor.Info} outline headerText='Services'>
          <ZMenuItem avatar={<MedicalServicesIcon color='success' />}>Health</ZMenuItem>
        </ZMenu>
      </ZToolbar>

      <ZRouteMap>
        <ZRoute path='getting-started' element={<ZGettingStartedPage />} />
        <ZRoute path='components'>
          <ZRoute path='alerts' element={<ZAlertsPage />} />
          <ZRoute path='boolean' element={<ZBooleanPage />} />
          <ZRoute path='button' element={<ZButtonPage />} />
          <ZRoute path='choice' element={<ZChoicePage />} />
        </ZRoute>
        <ZRoute path='/' element={<ZNavigate to='getting-started' />} />
        <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
      </ZRouteMap>
    </div>
  );
}