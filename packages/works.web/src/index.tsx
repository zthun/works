/* istanbul ignore file */
import { ZRouteOptionBuilder } from '@zthun/works.core';
import { ZImageSource, ZRoute, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZHomePage } from './home/home-page';

import { ZComponentsPage } from './components/components-page';
import { ZMicroservicesPage } from './microservices/microservices-page';

require('../images');

const container = createRoot(document.getElementById('zthunworks')!);

const routes = [
  new ZRouteOptionBuilder()
    .path('react-components')
    .avatar(<ZImageSource src='images/svg/react.svg' />)
    .name('React Components')
    .description('Build a UI')
    .build(),
  new ZRouteOptionBuilder()
    .path('microservices')
    .avatar(<ZImageSource src='images/svg/nest.svg' />)
    .name('Microservices')
    .description('Build a service')
    .build()
];

container.render(
  <ZWebAppLayout whoami='learn' profileApp='roadblock' routes={routes}>
    <ZRoute path='/home' element={<ZHomePage />} />
    <ZRoute path='/react-components' element={<ZComponentsPage />} />
    <ZRoute path='/microservices' element={<ZMicroservicesPage />} />
  </ZWebAppLayout>
);
