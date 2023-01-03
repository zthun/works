import ExtensionIcon from '@mui/icons-material/Extension';
import { ZSizeFixed } from '@zthun/works.chonkify';
import { cssClass, IZRouteOption } from '@zthun/works.core';
import {
  useFashionDesign,
  useNavigate,
  ZBorderLayout,
  ZCaption,
  ZCard,
  ZGridLayout,
  ZH3,
  ZLineItemLayout,
  ZPaddedBox
} from '@zthun/works.react';
import React from 'react';
import { ZRouteAllComponents } from '../../routes';

/**
 * Represents the components page.
 *
 * @returns
 *        The JSX to render the page.
 */
export function ZComponentsPage() {
  const { light, primary } = useFashionDesign();
  const navigate = useNavigate();

  const renderComponent = (route: IZRouteOption) => (
    <ZBorderLayout
      className={cssClass('ZComponentsPage-component')}
      key={route.path}
      border={{ fashion: light.dark, hover: primary.dark }}
      background={{ fashion: light, hover: primary }}
      onClick={() => navigate(route.path)}
    >
      <ZPaddedBox padding={ZSizeFixed.Large}>
        <ZLineItemLayout
          prefix={route.avatar}
          body={
            <>
              <ZH3 compact>{route.name}</ZH3>
              <ZCaption compact>{route.description}</ZCaption>
            </>
          }
        />
      </ZPaddedBox>
    </ZBorderLayout>
  );

  return (
    <ZCard
      className='ZComponentsPage-root'
      avatar={<ExtensionIcon fontSize='large' color='success' />}
      heading='Components'
      subHeading='Standardize Your Interfaces'
    >
      <ZGridLayout
        columns='auto auto auto auto'
        columnsLg='auto auto auto'
        columnsMd='auto auto'
        columnsSm='auto'
        gap={ZSizeFixed.Medium}
      >
        {ZRouteAllComponents.map(renderComponent)}
      </ZGridLayout>
    </ZCard>
  );
}
