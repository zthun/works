/* istanbul ignore file */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { ZWorksApp } from './app/app';

const container = createRoot(document.getElementById('zthunworks')!);

container.render(
  <React.StrictMode>
    <ZWorksApp />
  </React.StrictMode>
);
