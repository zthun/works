/* istanbul ignore file */
import { ZRouteOptionBuilder } from '@zthun/works.core';
import { ZImageSource, ZRoute, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZHomePage } from './home/home-page';

import { ZMicroservicesPage } from './microservices/microservices-page';
import { ZWebAppsPage } from './web-apps/web-apps-page';

require('../images');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = createRoot(document.getElementById('zthunworks')!);

const routes = [
  new ZRouteOptionBuilder()
    .path('web-apps')
    .avatar(<ZImageSource src='images/svg/react.svg' />)
    .name('Web Apps')
    .description('Build something for users')
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
    <ZRoute path='/web-apps/*' element={<ZWebAppsPage />} />
    <ZRoute path='/microservices/*' element={<ZMicroservicesPage />} />
  </ZWebAppLayout>
);
