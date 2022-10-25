import { AppBar } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { IZRouteOption, ZSizeFixed } from '@zthun/works.core';
import React from 'react';
import { GlobalStyles } from 'tss-react';
import { ZAlertList } from '../alert/alert-list';
import { ZWebAppDrawer } from '../apps/web-app-drawer';
import { ZWebAppHomeButton } from '../apps/web-app-home-button';
import { IZComponentHierarchy } from '../component/component-hierarchy';
import { ZHealthIndicator } from '../health/health-indicator';
import { ZStatusCodePage } from '../http/status-code-page';
import { ZIdentityButton } from '../identity/identity-button';
import { ZNavigate, ZRoute, ZRouteMap, ZRouter } from '../router/router-dom';
import { useZthunworksTheme } from '../theme/make-styles';
import { ZStateAnchor } from '../theme/state-anchor';
import { ZSeverityColor } from '../theme/state-color';
import { ZGridLayout } from './grid-layout';
import { ZPaddedBox } from './padded-box';

/**
 * Represents the properties for the standard WebAppLayout.
 */
export interface IZWebAppLayout extends IZComponentHierarchy {
  /**
   * The current id of the given application.
   */
  whoami: string;

  /**
   * The id of the profile app.
   *
   * If you don't set this, then it will hide the profile button.
   */
  profileApp?: string;

  /**
   * Optional routes heading routes to include for you application.
   */
  routes?: IZRouteOption[];

  /**
   * The home route.
   *
   * @default '/home'
   */
  home?: string;
}

const globalStyles = {
  body: {
    backgroundColor: 'whitesmoke',
    margin: 0
  }
};

/**
 * Represents a standard layout for a ZWebApp.
 *
 * The standard layout includes the top nav, the status code page,
 * the alert snackbar, and the appropriate redirects.
 *
 * @param props The properties for the layout.
 *
 * @returns The jsx for the web app layout.
 */
export function ZWebAppLayout(props: IZWebAppLayout) {
  const { children, home = '/home', whoami, profileApp, routes } = props;
  const theme = useZthunworksTheme();

  const ButtonProps = { color: ZSeverityColor.Primary, borderless: true };
  const DrawerProps = { anchor: ZStateAnchor.Right };
  const DrawerButtonProps = { ButtonProps, DrawerProps };

  return (
    <div className='ZWebAppLayout-root'>
      <GlobalStyles styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <ZRouter>
          <AppBar className='WebAppLayout-app-bar' position='sticky'>
            <ZGridLayout columns='auto 1fr auto auto auto' alignItems='center'>
              <ZWebAppHomeButton whoami={whoami} ButtonProps={ButtonProps} />
              <span />
              <ZIdentityButton profileApp={profileApp} ButtonProps={ButtonProps} />
              <ZHealthIndicator />
              <ZWebAppDrawer whoami={whoami} routes={routes} DrawerButtonProps={DrawerButtonProps} />
            </ZGridLayout>
          </AppBar>
          <ZPaddedBox padding={ZSizeFixed.Large}>
            <main>
              <ZRouteMap>
                {children}
                <ZRoute path='/status-code/:code' element={<ZStatusCodePage name='code' />} />
                <ZRoute path='/' element={<ZNavigate to={home} />} />
                <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
              </ZRouteMap>
            </main>
          </ZPaddedBox>
        </ZRouter>
        <ZAlertList />
      </ThemeProvider>
    </div>
  );
}
