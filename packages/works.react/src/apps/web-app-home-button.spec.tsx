/* eslint-disable require-jsdoc */

import { ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { createMocked } from '@zthun/spellcraft-jest';
import { ZUrlBuilder } from '@zthun/webigail-url';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { MemoryHistory, createMemoryHistory } from 'history';
import { noop, startCase } from 'lodash';
import React from 'react';
import { ZTestRouter } from '../router/router-dom';
import { ZWebAppHomeButton } from './web-app-home-button';
import { ZWebAppHomeButtonComponentModel } from './web-app-home-button.cm';
import { IZWebAppService, ZWebAppServiceContext } from './web-app-service';

describe('ZWebAppHomeButton', () => {
  let history: MemoryHistory;
  let whoami: string;
  let route: string | undefined;
  let testApp: IZWebApp;
  let webAppService: jest.Mocked<IZWebAppService>;

  async function createTestTarget() {
    const element = (
      <ZWebAppServiceContext.Provider value={webAppService}>
        <ZTestRouter location={history.location} navigator={history}>
          <ZWebAppHomeButton whoami={whoami} route={route} />
        </ZTestRouter>
      </ZWebAppServiceContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZWebAppHomeButtonComponentModel);
  }

  beforeEach(() => {
    history = createMemoryHistory();

    whoami = 'test-app';
    route = undefined;

    testApp = new ZWebAppBuilder()
      .id(whoami)
      .name('Test')
      .description('Unit test application')
      .short('An app for testing?')
      .icon(new ZUrlBuilder().gravatar().build())
      .domain('test.zthunworks.com')
      .build();

    webAppService = createMocked(['read']);
    webAppService.read.mockResolvedValue(testApp);
  });

  describe('Loading', () => {
    it('should be loading while the web app is not ready', async () => {
      // Arrange.
      webAppService.read.mockReturnValue(new Promise(noop));
      const target = await createTestTarget();
      // Act.
      const actual = await (await target.button()).loading();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Name', () => {
    it('should render the name of the application', async () => {
      // Arrange.
      delete testApp.icon;
      const target = await createTestTarget();
      await (await target.button()).load();
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(testApp.name);
    });

    it('should render the application id if the apps fail to load', async () => {
      // Arrange.
      webAppService.read.mockRejectedValue(new Error('Something went wrong'));
      const target = await createTestTarget();
      await (await target.button()).load();
      const expected = startCase(whoami);
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Description', () => {
    it('should render the short description', async () => {
      // Arrange.
      const target = await createTestTarget();
      await (await target.button()).load();
      // act.
      const actual = await target.description();
      // Assert.
      expect(actual).toEqual(testApp.short);
    });

    it('should render the error message if the app failed to load', async () => {
      // Arrange.
      const expected = new Error('Something went wrong');
      webAppService.read.mockRejectedValue(expected);
      const target = await createTestTarget();
      await (await target.button()).load();
      // act.
      const actual = await target.description();
      // Assert.
      expect(actual).toContain(expected.message);
    });
  });

  describe('Navigate', () => {
    it('should navigate to the home route', async () => {
      // Arrange.
      const target = await createTestTarget();
      const button = await target.button();
      await button.load();
      // Act.
      await button.click();
      // Assert.
      expect(history.location.pathname).toEqual('/');
    });

    it('should navigate to a custom specified route', async () => {
      // Arrange.
      route = '/custom';
      const target = await createTestTarget();
      const button = await target.button();
      await button.load();
      // Act.
      await button.click();
      // Assert.
      expect(history.location.pathname).toEqual('/custom');
    });
  });
});
