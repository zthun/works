/* istanbul ignore file */
import { ZRoute, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZHomePage } from './home/home-page';

import { ZMicroservicesPage } from './microservices/microservices-page';
import { withChildren, ZLearnPath } from './routes';
import { ZWebAppsPage } from './web-apps/web-apps-page';

require('../images');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = createRoot(document.getElementById('zthunworks')!);

container.render(
  <ZWebAppLayout whoami='learn' profileApp='roadblock'>
    <ZRoute path={ZLearnPath.home} element={<ZHomePage />} />
    <ZRoute path={withChildren(ZLearnPath.webApps.root)} element={<ZWebAppsPage />} />
    <ZRoute path={withChildren(ZLearnPath.microservices)} element={<ZMicroservicesPage />} />
  </ZWebAppLayout>
);
