import ExtensionIcon from '@mui/icons-material/Extension';
import { ZSizeFixed } from '@zthun/works.chonky-cat';
import { cssClass, IZRouteOption } from '@zthun/works.core';
import {
  makeStyles,
  useNavigate,
  ZBorderLayout,
  ZCaption,
  ZCard,
  ZColorTint,
  ZGridLayout,
  ZH3,
  ZLineItemLayout,
  ZPaddedBox,
  ZShadeColor
} from '@zthun/works.react';
import React from 'react';
import { ZWebAppsComponents } from '../web-apps-components';

const useComponentsPageStyles = makeStyles()(() => ({}));

/**
 * Represents the components page.
 *
 * @returns
 *        The JSX to render the page.
 */
export function ZComponentsPage() {
  const navigate = useNavigate();

  const { classes } = useComponentsPageStyles();

  const renderComponent = (route: IZRouteOption) => (
    <ZBorderLayout
      className={cssClass('ZComponentsPage-component')}
      key={route.path}
      border={{ color: ZShadeColor.Grey, tint: ZColorTint.T400 }}
      background={{ color: ZShadeColor.Grey, tint: ZColorTint.T200 }}
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
        {ZWebAppsComponents.map(renderComponent)}
      </ZGridLayout>
    </ZCard>
  );
}
