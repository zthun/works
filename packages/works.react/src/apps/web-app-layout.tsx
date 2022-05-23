import { ThemeProvider } from '@mui/system';
import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from 'tss-react';
import { ZAlertList } from '../alert/alert-list';
import { ZStatusCodePage } from '../codes/status-code-page';
import { IZComponentHierarchy } from '../component/component-hierarchy.interface';
import { ZContent } from '../content/content';
import { useIdentityRoot } from '../identity/identity.context';
import { useZthunworksTheme } from '../theme/make-styles';
import { IZTopNavProps, ZTopNav } from '../top/top-nav';
import { useWebAppsRoot } from './web-apps.context';

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
        <HashRouter>
          <ZTopNav {...props} />
          <ZContent>
            <Routes>
              {children}
              <Route path='/status-code/:code' element={<ZStatusCodePage name='code' />} />
              <Route path='/' element={<Navigate to={home} />} />
              <Route path='*' element={<Navigate to={'/status-code/404'} />} />
            </Routes>
          </ZContent>
        </HashRouter>
        <ZAlertList />
      </ThemeProvider>
    </div>
  );
}
