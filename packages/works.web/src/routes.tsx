import AbcIcon from '@mui/icons-material/Abc';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DiamondIcon from '@mui/icons-material/Diamond';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LoopIcon from '@mui/icons-material/Loop';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NumbersIcon from '@mui/icons-material/Numbers';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TitleIcon from '@mui/icons-material/Title';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import WarningIcon from '@mui/icons-material/Warning';
import { ZSizeFixed } from '@zthun/works.chonkify';

import { IZRouteOption, ZRouteOptionBuilder } from '@zthun/works.core';
import { ZImageSource } from '@zthun/works.react';
import React from 'react';

/**
 * Gets the full path of a route.
 *
 * @param route
 *        The route to convert the full path for.
 *
 * @returns
 *        The full path of a route.
 */
export function fullPath(route: IZRouteOption) {
  return route.owner ? `${route.owner}/${route.path}` : `/${route.path}`;
}

export const ZRouteHome = new ZRouteOptionBuilder()
  .name('Home')
  .path('home')
  .description('Get Started Building Applications')
  .build();

export const ZRouteMicroservices = new ZRouteOptionBuilder()
  .name('Microservices')
  .path('microservices')
  .description('Build Foundations For Application Services')
  .build();

export const ZRouteWebApps = new ZRouteOptionBuilder()
  .name('WebApps')
  .path('web-apps')
  .description('Build Something For Users')
  .avatar(<ZImageSource src='images/svg/react.svg' height={ZSizeFixed.Medium} width={ZSizeFixed.Medium} />)
  .build();

export const ZRouteComponents = new ZRouteOptionBuilder()
  .name('Components')
  .path('components')
  .description('Components')
  .owner(fullPath(ZRouteWebApps))
  .build();

export const ZRouteAlerts = new ZRouteOptionBuilder()
  .name('Alerts')
  .path('alerts')
  .description('User Feedback')
  .owner(fullPath(ZRouteComponents))
  .avatar(<WarningIcon fontSize='large' />)
  .build();

export const ZRouteBoolean = new ZRouteOptionBuilder()
  .name('Boolean')
  .path('boolean')
  .description('Basic Togglers')
  .avatar(<CheckBoxIcon fontSize='large' />)
  .owner(fullPath(ZRouteComponents))
  .build();

export const ZRouteButton = new ZRouteOptionBuilder()
  .name('Button')
  .path('button')
  .description('Click To Activate')
  .owner(fullPath(ZRouteComponents))
  .avatar(<SmartButtonIcon fontSize='large' />)
  .build();

export const ZRouteChoice = new ZRouteOptionBuilder()
  .name('Choice')
  .path('choice')
  .description('Select From An Option List')
  .owner(fullPath(ZRouteComponents))
  .avatar(<TouchAppIcon fontSize='large' />)
  .build();

export const ZRouteDrawer = new ZRouteOptionBuilder()
  .name('Drawer')
  .path('drawer')
  .description('Pop-Out Content')
  .owner(fullPath(ZRouteComponents))
  .avatar(<MenuOpenIcon fontSize='large' />)
  .build();

export const ZRouteFashion = new ZRouteOptionBuilder()
  .name('Fashion')
  .path('fashion')
  .description('Pretty Colors')
  .owner(fullPath(ZRouteComponents))
  .avatar(<DiamondIcon fontSize='large' />)
  .build();

export const ZRouteList = new ZRouteOptionBuilder()
  .name('List')
  .path('list')
  .description('Showing Multiple Items')
  .owner(fullPath(ZRouteComponents))
  .avatar(<FormatListNumberedIcon fontSize='large' />)
  .build();

export const ZRouteNumber = new ZRouteOptionBuilder()
  .name('Number')
  .path('number')
  .description('Spinners and Sliders')
  .owner(fullPath(ZRouteComponents))
  .avatar(<NumbersIcon fontSize='large' />)
  .build();

export const ZRoutePopup = new ZRouteOptionBuilder()
  .name('Popup')
  .path('popup')
  .description('Pop content in and out')
  .owner(fullPath(ZRouteComponents))
  .avatar(<CelebrationIcon fontSize='large' />)
  .build();

export const ZRouteSuspense = new ZRouteOptionBuilder()
  .name('Suspense')
  .path('suspense')
  .description('Working In The Background')
  .owner(fullPath(ZRouteComponents))
  .avatar(<LoopIcon fontSize='large' />)
  .build();

export const ZRouteText = new ZRouteOptionBuilder()
  .name('Text')
  .path('text')
  .description('Enter Some Strings')
  .owner(fullPath(ZRouteComponents))
  .avatar(<TitleIcon fontSize='large' />)
  .build();

export const ZRouteTypography = new ZRouteOptionBuilder()
  .name('Typography')
  .path('typography')
  .description('Standard Page Structures')
  .owner(fullPath(ZRouteComponents))
  .avatar(<AbcIcon fontSize='large' />)
  .build();

export const ZRouteAllComponents = [
  ZRouteAlerts,
  ZRouteBoolean,
  ZRouteButton,
  ZRouteChoice,
  ZRouteDrawer,
  ZRouteFashion,
  ZRouteList,
  ZRouteNumber,
  ZRoutePopup,
  ZRouteSuspense,
  ZRouteText,
  ZRouteTypography
];
