/* eslint-disable require-jsdoc */
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZWebAppService } from './web-app-service';

describe('ZWebAppsService', () => {
  let http: ZHttpServiceMock;
  let apps: IZWebApp[];

  function createTestTarget() {
    return new ZWebAppService(http);
  }

  beforeEach(() => {
    http = new ZHttpServiceMock();

    apps = [
      new ZWebAppBuilder().id('roadblock').name('Roadblock').domain('https://roadblock.zthunworks.com').build(),
      new ZWebAppBuilder().id('portal').name('Portal').domain('https://portal.zthunworks.com').build(),
      new ZWebAppBuilder().id('gateway`').name('Status').domain('https://gateway.zthunworks.com').build()
    ];

    http.set(ZWebAppService.createWebAppsUrl(), ZHttpMethod.Get, new ZHttpResultBuilder(apps).build());
  });

  describe('List', () => {
    it('should return the full list of web applications.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(apps);
    });
  });

  describe('Read', () => {
    it('should return the requested web application.', async () => {
      // Arrange.
      const target = createTestTarget();
      const [, expected] = apps;
      // Act.
      const actual = await target.read(expected._id);
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should throw an error if the application cannot be found', async () => {
      // Arrange.
      const target = createTestTarget();
      // Act & Assert
      await expect(() => target.read('not-an-app')).rejects.toBeTruthy();
    });
  });
});
