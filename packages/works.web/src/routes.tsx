import CelebrationIcon from '@mui/icons-material/Celebration';
import { ZImageSource } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';

import { ZRouteOptionBuilder } from '@zthun/works.core';
import React from 'react';

export const ZRouteHome = new ZRouteOptionBuilder()
  .name('Home')
  .path('')
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

export const ZRoutePopup = new ZRouteOptionBuilder()
  .name('Popup')
  .path('popup')
  .description('Pop content in and out')
  .avatar(<CelebrationIcon fontSize='large' />)
  .build();

export const ZRouteAllComponents = [ZRoutePopup];
