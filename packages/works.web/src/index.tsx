/* istanbul ignore file */
import { ZRoute, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZHomePage } from './home/home-page';

import { ZMicroservicesPage } from './microservices/microservices-page';
import { ZLearnPath } from './routes';
import { ZWebAppsPage } from './web-apps/web-apps-page';

require('../images');

const container = createRoot(document.getElementById('zthunworks')!);

container.render(
  <ZWebAppLayout whoami='learn' profileApp='roadblock'>
    <ZRoute path={ZLearnPath.home.root} element={<ZHomePage />} />
    <ZRoute path={`${ZLearnPath.webApps.root}/*`} element={<ZWebAppsPage />} />
    <ZRoute path={`${ZLearnPath.microservices.root}/*`} element={<ZMicroservicesPage />} />
  </ZWebAppLayout>
);
