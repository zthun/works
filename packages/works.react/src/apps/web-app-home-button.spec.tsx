/* eslint-disable require-jsdoc */

import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZUrlBuilder } from '@zthun/works.url';
import { createMemoryHistory, MemoryHistory } from 'history';
import { noop, startCase } from 'lodash';
import React from 'react';
import { ZTestRouter } from '../router/router-dom';
import { ZWebAppHomeButton } from './web-app-home-button';
import { ZWebAppHomeButtonComponentModel } from './web-app-home-button.cm';
import { IZWebAppService, ZWebAppServiceContext } from './web-app-service';

describe('ZWebAppHomeButton', () => {
  const performer = new ZCircusPerformer();
  const waiter = new ZCircusWait();

  let history: MemoryHistory;
  let whoami: string;
  let route: string | undefined;
  let testApp: IZWebApp;
  let webAppService: jest.Mocked<IZWebAppService>;
  let onBeforeNavigate: jest.Mock | undefined;
  let onAfterNavigate: jest.Mock | undefined;

  async function createTestTarget() {
    const element = (
      <ZWebAppServiceContext.Provider value={webAppService}>
        <ZTestRouter location={history.location} navigator={history}>
          <ZWebAppHomeButton
            whoami={whoami}
            route={route}
            onBeforeNavigate={onBeforeNavigate}
            onAfterNavigate={onAfterNavigate}
          />
        </ZTestRouter>
      </ZWebAppServiceContext.Provider>
    );

    const result = await new ZCircusSetupRender(element).setup();
    waiter.wait(() => !!ZWebAppHomeButtonComponentModel.find(result.container).length);
    const [target] = ZWebAppHomeButtonComponentModel.find(result.container);
    return new ZWebAppHomeButtonComponentModel(target, performer, waiter);
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
      const actual = await target.loading();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe('Name', () => {
    it('should render the name of the application', async () => {
      // Arrange.
      delete testApp.icon;
      const target = await createTestTarget();
      await target.load();
      // Act.
      const actual = await target.name();
      // Assert.
      expect(actual).toEqual(testApp.name);
    });

    it('should render the application id if the apps fail to load', async () => {
      // Arrange.
      webAppService.read.mockRejectedValue(new Error('Something went wrong'));
      const target = await createTestTarget();
      await target.load();
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
      await target.load();
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
      await target.load();
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
      await target.load();
      // Act.
      await target.navigate();
      // Assert.
      expect(history.location.pathname).toEqual('/');
    });

    it('should navigate to a custom specified route', async () => {
      // Arrange.
      route = '/custom';
      const target = await createTestTarget();
      await target.load();
      // Act.
      await target.navigate();
      // Assert.
      expect(history.location.pathname).toEqual('/custom');
    });

    it('should raise the onBeforeNavigate event', async () => {
      // Arrange.
      onBeforeNavigate = jest.fn();
      const target = await createTestTarget();
      await target.load();
      // Act.
      await target.navigate();
      // Assert.
      expect(onBeforeNavigate).toHaveBeenCalled();
    });

    it('should raise the onAfterNavigate event', async () => {
      // Arrange.
      onAfterNavigate = jest.fn();
      const target = await createTestTarget();
      await target.load();
      // Act.
      await target.navigate();
      // Assert.
      expect(onAfterNavigate).toHaveBeenCalled();
    });
  });
});