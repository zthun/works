/* eslint-disable require-jsdoc */

import { createMocked } from '@zthun/spellcraft-jest';
import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
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
    return ZCircusBy.first(driver, ZHomePageComponentModel);
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
    await (await target.webApps()).click();
    // Assert.
    expect(history.location.pathname).toEqual('/web-apps');
  });

  it('should navigate to the microservices page', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    await (await target.microservices()).click();
    // Assert.
    expect(history.location.pathname).toEqual('/microservices');
  });
});
