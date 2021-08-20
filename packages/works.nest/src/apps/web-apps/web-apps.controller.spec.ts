/* eslint-disable require-jsdoc */
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZAppsService } from '../apps.service';
import { ZWebAppsController } from './web-apps.controller';

describe('ZWebAppsController', () => {
  let apps: IZWebApp[];
  let service: jest.Mocked<ZAppsService>;

  function createTestTarget() {
    return new ZWebAppsController(service);
  }

  beforeEach(() => {
    apps = [new ZWebAppBuilder().id('one').name('One').build(), new ZWebAppBuilder().id('two').name('Two').build()];

    service = createMocked<ZAppsService>(['listWebApps']);
    service.listWebApps.mockResolvedValue(apps);
  });

  describe('List', () => {
    it('should return all apps.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(apps);
    });
  });
});
