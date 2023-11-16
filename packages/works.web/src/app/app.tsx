import {
  ZBannerMain,
  ZCaption,
  ZFashionThemeContext,
  ZH1,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter
} from '@zthun/fashion-boutique';
import { createLightTheme } from '@zthun/fashion-theme';
import React from 'react';
import { ZHomePage } from '../home/home-page';

const theme = createLightTheme();

/**
 * Main application.
 *
 * @returns
 *        The jsx for rendering the application.
 */
export function ZWorksApp() {
  const prefix = (
    <div className='ZWorksApp-description'>
      <ZH1 compact>Zthunworks</ZH1>
      <ZCaption compact>Development is Fun!</ZCaption>
    </div>
  );

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={theme}>
        <ZBannerMain prefix={prefix}>
          <ZRouteMap>
            <ZRoute path='/' element={<ZHomePage />} />
            <ZRoute path='*' element={<ZNotFound />} />
          </ZRouteMap>
        </ZBannerMain>
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
