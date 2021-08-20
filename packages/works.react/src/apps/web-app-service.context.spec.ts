/* eslint-disable require-jsdoc */
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZWebAppService } from './web-app-service.context';

describe('ZWebAppsService', () => {
  let http: ZHttpServiceMock;

  function createTestTarget() {
    return new ZWebAppService(http);
  }

  beforeEach(() => {
    http = new ZHttpServiceMock();
  });

  describe('List', () => {
    let apps: IZWebApp[];

    beforeEach(() => {
      apps = [
        new ZWebAppBuilder().id('roadblock').name('Roadblock').domain('https://roadblock.zthunworks.com').build(),
        new ZWebAppBuilder().id('portal').name('Portal').domain('https://portal.zthunworks.com').build(),
        new ZWebAppBuilder().id('gateway`').name('Status').domain('https://gateway.zthunworks.com').build()
      ];

      http.set(ZWebAppService.createWebAppsUrl(), ZHttpMethod.Get, new ZHttpResultBuilder().data(apps).build());
    });

    it('should return the full list of web applications.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(apps);
    });
  });
});
