/* istanbul ignore file */
import { ZRoute, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZHomePage } from './home/home-page';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = createRoot(document.getElementById('zthunworks')!);

container.render(
  <ZWebAppLayout whoami='learn' profileApp='roadblock'>
    <ZRoute path='/home' element={<ZHomePage />} />
  </ZWebAppLayout>
);
