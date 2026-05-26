import {
  ZBannerMain,
  ZCaption,
  ZFashionThemeContext,
  ZH1,
  ZImage,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import theme from "@zthun/fashion-theme-dark";

import { ZProjectsPage } from "../projects/projects-page.js";

/**
 * Main application.
 *
 * @returns
 *        The jsx for rendering the application.
 */
export function ZWorksApp() {
  const prefix = (
    <ZStack className="ZWorksApp-description">
      <ZH1 compact>Zthunworks</ZH1>
      <ZCaption compact>Development is Fun!</ZCaption>
    </ZStack>
  );

  const avatar = (
    <ZImage
      src="/images/svg/works.svg"
      width={ZSizeFixed.Medium}
      fit="scale-down"
    />
  );

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={theme}>
        <ZBannerMain TitleProps={{ avatar, prefix }}>
          <ZRouteMap>
            <ZRoute path="/" element={<ZProjectsPage />} />
            <ZRoute path="*" element={<ZNotFound />} />
          </ZRouteMap>
        </ZBannerMain>
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
