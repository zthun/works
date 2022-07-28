import { ThemeProvider } from '@mui/system';
import React from 'react';
import { GlobalStyles } from 'tss-react';
import { ZAlertList } from '../alert/alert-list';
import { useWebAppsRoot } from '../apps/web-apps.context';
import { ZStatusCodePage } from '../codes/status-code-page';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { ZContent } from '../content/content';
import { useIdentityRoot } from '../identity/identity.context';
import { ZNavigate, ZRoute, ZRouteMap, ZRouter } from '../router/router-dom';
import { useZthunworksTheme } from '../theme/make-styles';
import { IZTopNavProps, ZTopNav } from '../top/top-nav';

/**
 * Represents the properties for the standard WebAppLayout.
 */
export interface IZWebAppLayout extends IZTopNavProps, IZComponentHierarchy {
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
  useWebAppsRoot();
  useIdentityRoot();

  const { children, home = '/home' } = props;
  const theme = useZthunworksTheme();

  return (
    <div className='ZWebAppLayout-root'>
      <GlobalStyles styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <ZRouter>
          <ZTopNav {...props} />
          <ZContent>
            <ZRouteMap>
              {children}
              <ZRoute path='/status-code/:code' element={<ZStatusCodePage name='code' />} />
              <ZRoute path='/' element={<ZNavigate to={home} />} />
              <ZRoute path='*' element={<ZNavigate to={'/status-code/404'} />} />
            </ZRouteMap>
          </ZContent>
        </ZRouter>
        <ZAlertList />
      </ThemeProvider>
    </div>
  );
}
