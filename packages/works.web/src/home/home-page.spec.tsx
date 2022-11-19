/* eslint-disable require-jsdoc */

import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { IZWebAppService, ZTestRouter, ZWebAppServiceContext } from '@zthun/works.react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { ZHomePage } from './home-page';
import { ZHomePageComponentModel } from './home-page.cm';

describe('ZHomePage', () => {
  let learn: IZWebApp;
  let history: MemoryHistory;
  let webApps: jest.Mocked<IZWebAppService>;

  async function createTestTarget() {
    const element = (
      <ZWebAppServiceContext.Provider value={webApps}>
        <ZTestRouter navigator={history} location={history.location}>
          <ZHomePage />
        </ZTestRouter>
      </ZWebAppServiceContext.Provider>
    );
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZHomePageComponentModel, ZHomePageComponentModel.Selector);
  }

  beforeEach(() => {
    history = createMemoryHistory();

    learn = new ZWebAppBuilder().id('learn').name('Learn').build();
    webApps = createMocked(['read']);
    webApps.read.mockResolvedValue(learn);
  });

  it('should navigate to the web apps page', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    await target.openWebApps();
    // Assert.
    expect(history.location.pathname).toEqual('/web-apps');
  });

  it('should navigate to the microservices page', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    await target.openMicroservices();
    // Assert.
    expect(history.location.pathname).toEqual('/microservices');
  });
});