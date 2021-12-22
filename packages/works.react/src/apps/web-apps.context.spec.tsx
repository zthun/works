/* eslint-disable require-jsdoc */
import { renderHook } from '@testing-library/react-hooks';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import React from 'react';
import { ZDataState } from '../state/data-state.class';
import { IZDataState } from '../state/data-state.interface';
import { IZWebAppService, ZWebAppServiceContext } from './web-app-service.context';
import { useWebApp, useWebAppsRoot, ZWebAppsContext } from './web-apps.context';

describe('WebApps', () => {
  let portal: IZWebApp;
  let legal: IZWebApp;
  let webApps: IZWebApp[];
  let globalWebApps: IZDataState<IZWebApp[]>;
  let webAppsService: jest.Mocked<IZWebAppService>;

  beforeEach(() => {
    portal = new ZWebAppBuilder().id('portal').name('Portal').domain('https://portal.zthunworks.com').source('https://github.com/zthun/portal').build();
    legal = new ZWebAppBuilder().id('legal').name('Legal').domain('https://legal.zthunworks.com').source('https://github.com/zthun/legal').build();
    webApps = [portal, legal];

    globalWebApps = new ZDataState(undefined);

    webAppsService = createMocked(['list']);
    webAppsService.list.mockResolvedValue(webApps);
  });

  describe('useWebApp', () => {
    let id: string;

    async function createTestTarget() {
      const wrapper = ({ children }) => <ZWebAppsContext.Provider value={globalWebApps}>{children}</ZWebAppsContext.Provider>;
      const target = renderHook(() => useWebApp(id), { wrapper });
      return target;
    }

    beforeEach(() => {
      globalWebApps.set(webApps);
      id = portal._id;
    });

    it('should return undefined if the apps are loading.', async () => {
      // Arrange
      globalWebApps.set();
      const target = await createTestTarget();
      // Act
      const actual = target.result.current;
      // Assert
      expect(actual).toBeUndefined();
    });

    it('should return null if the app does not exist.', async () => {
      // Arrange
      id = 'lol-wut?';
      const target = await createTestTarget();
      // Act
      const actual = target.result.current;
      // Assert
      expect(actual).toBeNull();
    });

    it('should return null if the id is falsy.', async () => {
      // Arrange
      id = undefined;
      const target = await createTestTarget();
      // Act
      const actual = target.result.current;
      // Assert
      expect(actual).toBeNull();
    });

    it('should return null if the apps failed to load.', async () => {
      // Arrange
      globalWebApps.set(null);
      const target = await createTestTarget();
      // Act
      const actual = target.result.current;
      // Assert
      expect(actual).toBeNull();
    });

    it('should return the web app from the list.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.result.current;
      // Assert
      expect(actual).toEqual(portal);
    });
  });

  describe('useWebAppsRoot', () => {
    async function createTestTarget() {
      const wrapper = ({ children }) => (
        <ZWebAppsContext.Provider value={globalWebApps}>
          <ZWebAppServiceContext.Provider value={webAppsService}>{children}</ZWebAppServiceContext.Provider>
        </ZWebAppsContext.Provider>
      );
      const target = renderHook(() => useWebAppsRoot(), { wrapper });
      return target;
    }

    it('should set the global profile.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const currentApps = globalWebApps.data;
      // Assert
      target.waitFor(() => currentApps === webApps);
    });

    it('should set the global profile list to null if the service fails.', async () => {
      // Arrange
      webAppsService.list.mockRejectedValue('failed');
      const target = await createTestTarget();
      // Act
      const currentApps = globalWebApps.data;
      // Assert
      target.waitFor(() => currentApps === null);
    });
  });
});
