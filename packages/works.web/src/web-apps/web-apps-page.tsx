import { ZSizeFixed } from '@zthun/works.chonky-cat';
import {
  useNavigate,
  ZBreadcrumbsLocation,
  ZDrawerButton,
  ZGridLayout,
  ZList,
  ZListGroup,
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
import { ZComponentsPage } from './components/components-page';
import { ZDrawerPage } from './components/drawer/drawer-page';
import { ZListPage } from './components/list/list-page';
import { ZNumberPage } from './components/number/number-page';
import { ZSuspensePage } from './components/suspense/suspense-page';
import { ZTextPage } from './components/text/text-page';
import { ZTypographyPage } from './components/typography/typography-page';
import { ZGettingStartedPage } from './getting-started/getting-started-page';
import { ZWebAppsComponents } from './web-apps-components';

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
        <ZRoute path='' element={<ZComponentsPage />} />
      </ZRoute>
      <ZRoute path='/' element={<ZGettingStartedPage />} />
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
          <ZListGroup heading='Components' />
          {ZWebAppsComponents.map((component) => (
            <ZListLineItem
              key={component.path}
              prefix={component.avatar}
              heading={component.name}
              subHeading={component.description}
              onClick={navigate.bind(null, `components/${component.path}`)}
            />
          ))}
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
