import {
  ZBannerMain,
  ZCaption,
  ZFashionThemeContext,
  ZH1,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter,
  ZStack
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { createLightTheme } from '@zthun/fashion-theme';
import { ZOrientation } from '@zthun/helpful-fn';
import { ZHealthIndicator, ZIdentityButton } from '@zthun/works.react';
import React from 'react';
import { ZHomePage } from '../home/home-page';
import { ZMicroservicesPage } from '../microservices/microservices-page';
import { ZRouteHome, ZRouteMicroservices } from '../routes';

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

  const suffix = (
    <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.Small}>
      <ZHealthIndicator />
      <ZIdentityButton />
    </ZStack>
  );

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={theme}>
        <ZBannerMain prefix={prefix} suffix={suffix}>
          <ZRouteMap>
            <ZRoute path={ZRouteHome.path} element={<ZHomePage />} />
            <ZRoute path={ZRouteMicroservices.path} element={<ZMicroservicesPage />} />
            <ZRoute path='*' element={<ZNotFound />} />
          </ZRouteMap>
        </ZBannerMain>
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
