import {
  ZBannerMain,
  ZCaption,
  ZFashionThemeContext,
  ZH1,
  ZImageSource,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter,
  ZStack
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { createDarkTheme } from '@zthun/fashion-theme';
import React from 'react';
import { ZHomePage } from '../home/home-page';

const theme = createDarkTheme();

/**
 * Main application.
 *
 * @returns
 *        The jsx for rendering the application.
 */
export function ZWorksApp() {
  const prefix = (
    <ZStack className='ZWorksApp-description'>
      <ZH1 compact>Zthunworks</ZH1>
      <ZCaption compact>Development is Fun!</ZCaption>
    </ZStack>
  );

  const avatar = <ZImageSource src='/images/svg/works.svg' width={ZSizeFixed.Medium} />;

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={theme}>
        <ZBannerMain avatar={avatar} prefix={prefix}>
          <ZRouteMap>
            <ZRoute path='/' element={<ZHomePage />} />
            <ZRoute path='*' element={<ZNotFound />} />
          </ZRouteMap>
        </ZBannerMain>
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
