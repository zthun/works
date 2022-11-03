import AbcIcon from '@mui/icons-material/Abc';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LoopIcon from '@mui/icons-material/Loop';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NumbersIcon from '@mui/icons-material/Numbers';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TitleIcon from '@mui/icons-material/Title';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import WarningIcon from '@mui/icons-material/Warning';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import {
  useNavigate,
  ZBreadcrumbsLocation,
  ZDrawerButton,
  ZGridLayout,
  ZList,
  ZListLineItem,
  ZNavigate,
  ZRoute,
  ZRouteMap,
  ZSeverityColor,
  ZStateAnchor
} from '@zthun/works.react';
import { useLocation } from '@zthun/works.react/src/router/router-dom';
import React from 'react';
import { ZAlertsPage } from './components/alerts/alerts-page';
import { ZBooleanPage } from './components/boolean/boolean-page';
import { ZButtonPage } from './components/button/button-page';
import { ZChoicePage } from './components/choice/choice-page';
import { ZDrawerPage } from './components/drawer/drawer-page';
import { ZListPage } from './components/list/list-page';
import { ZNumberPage } from './components/number/number-page';
import { ZSuspensePage } from './components/suspense/suspense-page';
import { ZTextPage } from './components/text/text-page';
import { ZTypographyPage } from './components/typography/typography-page';
import { ZGettingStartedPage } from './getting-started/getting-started-page';

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZWebAppsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const renderDetails = () => (
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
  );

  const renderNavigation = () => (
    <ZGridLayout columns='auto 1fr' gap={ZSizeFixed.Medium} alignItems='center'>
      <ZDrawerButton
        DrawerProps={{ anchor: ZStateAnchor.Left }}
        ButtonProps={{ color: ZSeverityColor.Secondary }}
        closeOnChange={[location]}
      >
        <ZList>
          <ZListLineItem
            prefix={<WarningIcon color='warning' fontSize='large' />}
            heading='Alerts'
            subHeading='User Feedback'
            onClick={navigate.bind(null, 'components/alerts')}
          />
          <ZListLineItem
            prefix={<CheckBoxIcon color='success' fontSize='large' />}
            onClick={navigate.bind(null, 'components/boolean')}
            heading='Boolean'
          />
          <ZListLineItem
            prefix={<SmartButtonIcon color='error' fontSize='large' />}
            onClick={navigate.bind(null, 'components/button')}
            heading='Button'
          />
          <ZListLineItem
            prefix={<TouchAppIcon color='warning' fontSize='large' />}
            onClick={navigate.bind(null, 'components/choice')}
            heading='Choice'
          />
          <ZListLineItem
            prefix={<MenuOpenIcon color='success' fontSize='large' />}
            onClick={navigate.bind(null, 'components/drawer')}
            heading='Drawer'
          />
          <ZListLineItem
            prefix={<FormatListNumberedIcon color='info' fontSize='large' />}
            onClick={navigate.bind(null, 'components/list')}
            heading='List'
          />
          <ZListLineItem
            prefix={<NumbersIcon color='success' fontSize='large' />}
            onClick={navigate.bind(null, 'components/number')}
            heading='Number'
          />
          <ZListLineItem
            prefix={<LoopIcon color='warning' fontSize='large' />}
            onClick={navigate.bind(null, 'components/suspense')}
            heading='Suspense'
          />
          <ZListLineItem
            prefix={<TitleIcon color='primary' fontSize='large' />}
            onClick={navigate.bind(null, 'components/text')}
            heading='Text'
          />
          <ZListLineItem
            prefix={<AbcIcon color='inherit' fontSize='large' />}
            onClick={navigate.bind(null, 'components/typography')}
            heading='Typography'
          />
        </ZList>
      </ZDrawerButton>
      <ZBreadcrumbsLocation />
    </ZGridLayout>
  );

  return (
    <ZGridLayout gap={ZSizeFixed.Large} className='ZWebAppsPage-root'>
      {renderNavigation()}
      {renderDetails()}
    </ZGridLayout>
  );
}
