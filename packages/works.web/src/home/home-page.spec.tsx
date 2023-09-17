import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZTestRouter } from '@zthun/fashion-boutique';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { IZWebAppService, ZWebAppServiceContext } from '@zthun/works.react';
import { MemoryHistory, createMemoryHistory } from 'history';
import React from 'react';
import { Mocked, beforeEach, describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { ZHomePage } from './home-page';
import { ZHomePageComponentModel } from './home-page.cm';

describe('ZHomePage', () => {
  let learn: IZWebApp;
  let history: MemoryHistory;
  let webApps: Mocked<IZWebAppService>;

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
    webApps = mock();
    webApps.read.mockResolvedValue(learn);
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
