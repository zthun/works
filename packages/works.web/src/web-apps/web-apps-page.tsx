import { ZSizeFixed } from '@zthun/fashion-tailor';

import React from 'react';
import { ZRouteAllComponents, ZRouteWebApps } from '../routes';

import {
  ZCard,
  ZDrawerButton,
  ZGrid,
  ZList,
  ZListGroup,
  ZListLineItem,
  ZParagraph,
  useFashionTheme,
  useLocation,
  useNavigate
} from '@zthun/fashion-boutique';
import { ZHorizontalAnchor } from '@zthun/helpful-fn';

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZWebAppsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { secondary } = useFashionTheme();

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

  const renderNavigation = () => (
    <ZGrid columns='auto 1fr' gap={ZSizeFixed.Medium} alignItems='center'>
      <ZDrawerButton
        ButtonProps={{ fashion: secondary }}
        DrawerProps={{ anchor: ZHorizontalAnchor.Left }}
        closeOnChange={[location]}
      >
        <ZList>
          <ZListGroup heading='Components' />
          {ZRouteAllComponents.map((component) => (
            <ZListLineItem
              key={component.path}
              prefix={component.avatar}
              heading={component.name}
              subHeading={component.description}
              onClick={navigate.bind(null, `${component.path}`)}
            />
          ))}
        </ZList>
      </ZDrawerButton>
    </ZGrid>
  );

  return (
    <ZGrid gap={ZSizeFixed.Large} className='ZWebAppsPage-root'>
      {renderNavigation()}
      {renderRoot()}
    </ZGrid>
  );
}
