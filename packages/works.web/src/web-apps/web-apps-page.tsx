import AbcIcon from '@mui/icons-material/Abc';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LoopIcon from '@mui/icons-material/Loop';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NumbersIcon from '@mui/icons-material/Numbers';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import StartIcon from '@mui/icons-material/Start';
import TitleIcon from '@mui/icons-material/Title';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import WarningIcon from '@mui/icons-material/Warning';
import {
  makeStyles,
  useNavigate,
  ZButton,
  ZMenu,
  ZMenuItem,
  ZNavigate,
  ZRoute,
  ZRouteMap,
  ZSeverityColor
} from '@zthun/works.react';
import { ZToolbarLayout } from '@zthun/works.react/src';
import React from 'react';
import { ZAlertsPage } from './components/alerts-page';
import { ZBooleanPage } from './components/boolean-page';
import { ZButtonPage } from './components/button-page/button-page';
import { ZChoicePage } from './components/choice-page';
import { ZDrawerPage } from './components/drawer-page';
import { ZListPage } from './components/list-page/list-page';
import { ZNumberPage } from './components/number-page/number-page';
import { ZSuspensePage } from './components/suspense-page/suspense-page';
import { ZTextPage } from './components/text-page/text-page';
import { ZTypographyPage } from './components/typography-page';
import { ZGettingStartedPage } from './getting-started/getting-started-page';

const useWebAppPageStyles = makeStyles()((theme) => ({
  toolbar: {
    marginBottom: theme.gap()
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
      <ZToolbarLayout className={styles.classes.toolbar}>
        <ZButton
          avatar={<StartIcon color='success' />}
          color={ZSeverityColor.Info}
          outline
          onClick={navigate.bind(null, 'getting-started')}
          label='Getting Started'
        />
        <ZMenu avatar={<SettingsIcon color='primary' />} color={ZSeverityColor.Info} outline label='Components'>
          <ZMenuItem
            avatar={<WarningIcon color='warning' />}
            onClick={navigate.bind(null, 'components/alerts')}
            label='Alerts'
          />
          <ZMenuItem
            avatar={<CheckBoxIcon color='success' />}
            onClick={navigate.bind(null, 'components/boolean')}
            label='Boolean'
          />
          <ZMenuItem
            avatar={<SmartButtonIcon color='error' />}
            onClick={navigate.bind(null, 'components/button')}
            label='Button'
          />
          <ZMenuItem
            avatar={<TouchAppIcon color='warning' />}
            onClick={navigate.bind(null, 'components/choice')}
            label='Choice'
          />
          <ZMenuItem
            avatar={<MenuOpenIcon color='success' />}
            onClick={navigate.bind(null, 'components/drawer')}
            label='Drawer'
          />
          <ZMenuItem
            avatar={<FormatListNumberedIcon color='info' />}
            onClick={navigate.bind(null, 'components/list')}
            label='List'
          />
          <ZMenuItem
            avatar={<NumbersIcon color='success' />}
            onClick={navigate.bind(null, 'components/number')}
            label='Number'
          />
          <ZMenuItem
            avatar={<LoopIcon color='warning' />}
            onClick={navigate.bind(null, 'components/suspense')}
            label='Suspense'
          />
          <ZMenuItem
            avatar={<TitleIcon color='primary' />}
            onClick={navigate.bind(null, 'components/text')}
            label='Text'
          />
          <ZMenuItem
            avatar={<AbcIcon color='inherit' />}
            onClick={navigate.bind(null, 'components/typography')}
            label='Typography'
          />
        </ZMenu>
        <ZMenu avatar={<ElectricalServicesIcon color='warning' />} color={ZSeverityColor.Info} outline label='Services'>
          <ZMenuItem avatar={<MedicalServicesIcon color='success' />} label='Health' />
        </ZMenu>
      </ZToolbarLayout>

      <ZRouteMap>
        <ZRoute path='getting-started' element={<ZGettingStartedPage />} />
        <ZRoute path='components'>
          <ZRoute path='alerts' element={<ZAlertsPage />} />
          <ZRoute path='boolean' element={<ZBooleanPage />} />
          <ZRoute path='button' element={<ZButtonPage />} />
          <ZRoute path='choice' element={<ZChoicePage />} />
          <ZRoute path='drawer' element={<ZDrawerPage />} />
          <ZRoute path='list' element={<ZListPage />} />
          <ZRoute path='number' element={<ZNumberPage />} />
          <ZRoute path='suspense' element={<ZSuspensePage />} />
          <ZRoute path='text' element={<ZTextPage />} />
          <ZRoute path='typography' element={<ZTypographyPage />} />
        </ZRoute>
        <ZRoute path='/' element={<ZNavigate to='getting-started' />} />
        <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
      </ZRouteMap>
    </div>
  );
}
