/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import React from 'react';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
import { IZWebAppService, ZWebAppServiceContext } from './web-app-service.context';
import { useWebAppsRoot, ZWebAppsContext } from './web-apps.context';

function ZWebAppsRoot() {
  useWebAppsRoot();
  return <div />;
}

describe('WebApps', () => {
  let portal: IZWebApp;
  let legal: IZWebApp;
  let webApps: IZWebApp[];
  let globalWebApps: IZDataState<IZWebApp[]>;
  let webAppsService: jest.Mocked<IZWebAppService>;

  async function createTestTarget() {
    const target = render(
      <ZWebAppsContext.Provider value={globalWebApps}>
        <ZWebAppServiceContext.Provider value={webAppsService}>
          <ZWebAppsRoot></ZWebAppsRoot>
        </ZWebAppServiceContext.Provider>
      </ZWebAppsContext.Provider>
    );
    await waitFor(async () => globalWebApps.data !== undefined);
    return target;
  }

  beforeEach(() => {
    portal = new ZWebAppBuilder().id('portal').name('Portal').domain('https://portal.zthunworks.com').source('https://github.com/zthun/portal').build();
    legal = new ZWebAppBuilder().id('legal').name('Legal').domain('https://legal.zthunworks.com').source('https://github.com/zthun/legal').build();
    webApps = [portal, legal];

    globalWebApps = new ZDataState(undefined);

    webAppsService = createMocked(['list']);
    webAppsService.list.mockResolvedValue(webApps);
  });

  it('should set the global profile.', async () => {
    // Arrange
    await createTestTarget();
    // Act
    const currentApps = globalWebApps.data;
    // Assert
    expect(currentApps).toBe(webApps);
  });

  it('should set the global profile list to null if the service fails.', async () => {
    // Arrange
    webAppsService.list.mockRejectedValue('failed');
    await createTestTarget();
    // Act
    const currentApps = globalWebApps.data;
    // Assert
    expect(currentApps).toBeNull();
  });
});
