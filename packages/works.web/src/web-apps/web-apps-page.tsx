import { ZSizeFixed } from '@zthun/fashion-tailor';
import {
  useFashionDesign,
  useNavigate,
  ZBreadcrumbsLocation,
  ZCard,
  ZDrawerButton,
  ZGridLayout,
  ZList,
  ZListGroup,
  ZListLineItem,
  ZNavigate,
  ZParagraph,
  ZRoute,
  ZRouteMap,
  ZStateAnchor
} from '@zthun/works.react';
import { useLocation } from '@zthun/works.react/src/router/router-dom';
import React from 'react';
import {
  ZRouteAlerts,
  ZRouteAllComponents,
  ZRouteBoolean,
  ZRouteButton,
  ZRouteChoice,
  ZRouteComponents,
  ZRouteDrawer,
  ZRouteFashion,
  ZRouteList,
  ZRouteNumber,
  ZRoutePopup,
  ZRouteSuspense,
  ZRouteText,
  ZRouteTypography,
  ZRouteWebApps
} from '../routes';
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

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZWebAppsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { secondary } = useFashionDesign();

  const renderRoot = () => (
    <ZCard
      className='ZGettingStartedPage-root'
      avatar={ZRouteWebApps.avatar}
      heading={ZRouteWebApps.name}
      subHeading={ZRouteWebApps.description}
    >
      <ZParagraph>
        Users interact with your web applications through user interfaces. You can develop a great API that is perfectly
        scalable and clean, but unless there is a friendly way to interact with it, most users will never know about it.
        This is why developing a solid front end is so important. Front ends allow your users to use your system without
        needing to know all of the backend implementation that goes into it.
      </ZParagraph>
    </ZCard>
  );

  const renderDetails = () => (
    <ZRouteMap>
      <ZRoute path={ZRouteComponents.path}>
        <ZRoute path={ZRouteAlerts.path} element={<ZAlertsPage />} />
        <ZRoute path={ZRouteBoolean.path} element={<ZBooleanPage />} />
        <ZRoute path={ZRouteButton.path} element={<ZButtonPage />} />
        <ZRoute path={ZRouteChoice.path} element={<ZChoicePage />} />
        <ZRoute path={ZRouteDrawer.path} element={<ZDrawerPage />} />
        <ZRoute path={ZRouteFashion.path} element={<ZFashionPage />} />
        <ZRoute path={ZRouteList.path} element={<ZListPage />} />
        <ZRoute path={ZRouteNumber.path} element={<ZNumberPage />} />
        <ZRoute path={ZRoutePopup.path} element={<ZPopupPage />} />
        <ZRoute path={ZRouteSuspense.path} element={<ZSuspensePage />} />
        <ZRoute path={ZRouteText.path} element={<ZTextPage />} />
        <ZRoute path={ZRouteTypography.path} element={<ZTypographyPage />} />
        <ZRoute path='' element={<ZComponentsPage />} />
      </ZRoute>
      <ZRoute path='/' element={renderRoot()} />
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
          <ZListGroup heading={ZRouteComponents.name} />
          {ZRouteAllComponents.map((component) => (
            <ZListLineItem
              key={component.path}
              prefix={component.avatar}
              heading={component.name}
              subHeading={component.description}
              onClick={navigate.bind(null, `${ZRouteComponents.path}/${component.path}`)}
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
