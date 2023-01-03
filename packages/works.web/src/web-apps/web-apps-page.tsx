import { ZSizeFixed } from '@zthun/works.chonkify';
import {
  useFashionDesign,
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
import { ZFashionPage } from './components/fashion/fashion-page';
import { ZListPage } from './components/list/list-page';
import { ZNumberPage } from './components/number/number-page';
import { ZPopupPage } from './components/popup/popup-page';
import { ZSuspensePage } from './components/suspense/suspense-page';
import { ZTextPage } from './components/text/text-page';
import { ZTypographyPage } from './components/typography/typography-page';
import { ZGettingStartedPage } from './getting-started/getting-started-page';
import {
  ZComponentAlerts,
  ZComponentBoolean,
  ZComponentButton,
  ZComponentChoice,
  ZComponentDrawer,
  ZComponentFashion,
  ZComponentList,
  ZComponentNumber,
  ZComponentPopup,
  ZComponents,
  ZComponentSuspense,
  ZComponentText,
  ZComponentTypography,
  ZWebAppsComponents
} from './web-apps-components';

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZWebAppsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { secondary } = useFashionDesign();

  const renderDetails = () => (
    <ZRouteMap>
      <ZRoute path={ZComponents.path}>
        <ZRoute path={ZComponentAlerts.path} element={<ZAlertsPage />} />
        <ZRoute path={ZComponentBoolean.path} element={<ZBooleanPage />} />
        <ZRoute path={ZComponentButton.path} element={<ZButtonPage />} />
        <ZRoute path={ZComponentChoice.path} element={<ZChoicePage />} />
        <ZRoute path={ZComponentDrawer.path} element={<ZDrawerPage />} />
        <ZRoute path={ZComponentFashion.path} element={<ZFashionPage />} />
        <ZRoute path={ZComponentList.path} element={<ZListPage />} />
        <ZRoute path={ZComponentNumber.path} element={<ZNumberPage />} />
        <ZRoute path={ZComponentPopup.path} element={<ZPopupPage />} />
        <ZRoute path={ZComponentSuspense.path} element={<ZSuspensePage />} />
        <ZRoute path={ZComponentText.path} element={<ZTextPage />} />
        <ZRoute path={ZComponentTypography.path} element={<ZTypographyPage />} />
        <ZRoute path='' element={<ZComponentsPage />} />
      </ZRoute>
      <ZRoute path='/' element={<ZGettingStartedPage />} />
      <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
    </ZRouteMap>
  );

  const renderNavigation = () => (
    <ZGridLayout columns='auto 1fr' gap={ZSizeFixed.Medium} alignItems='center'>
      <ZDrawerButton
        ButtonProps={{ fashion: secondary }}
        DrawerProps={{ anchor: ZStateAnchor.Left }}
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
