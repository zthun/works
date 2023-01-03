/* eslint-disable require-jsdoc */

import { createMocked } from '@zthun/spellcraft-jest';
import { ZCircusBy } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { IZWebApp, required, ZWebAppBuilder } from '@zthun/works.core';
import { ZUrlBuilder } from '@zthun/works.url';
import { createMemoryHistory, MemoryHistory } from 'history';
import { find, startCase } from 'lodash';
import React from 'react';
import { ZTestRouter } from '../router/router-dom';
import { ZWindowServiceContext } from '../window/window-service';
import { ZWebAppDrawer } from './web-app-drawer';
import { ZWebAppDrawerComponentModel } from './web-app-drawer.cm';
import { ZWebAppService, ZWebAppServiceContext } from './web-app-service';

describe('ZWebAppDrawer', () => {
  let webAppLearn: IZWebApp;
  let webAppRoadblock: IZWebApp;
  let webAppTerms: IZWebApp;
  let webApps: IZWebApp[];
  let whoami: string;
  let home: string | undefined;

  let win: jest.Mocked<typeof globalThis>;
  let webAppService: jest.Mocked<ZWebAppService>;
  let history: MemoryHistory;

  async function createTestTarget() {
    const element = (
      <ZWindowServiceContext.Provider value={win}>
        <ZWebAppServiceContext.Provider value={webAppService}>
          <ZTestRouter location={history.location} navigator={history}>
            <ZWebAppDrawer whoami={whoami} home={home} />
          </ZTestRouter>
        </ZWebAppServiceContext.Provider>
      </ZWindowServiceContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZWebAppDrawerComponentModel);
  }

  beforeEach(() => {
    home = undefined;

    history = createMemoryHistory();

    win = createMocked(['open']);

    const gravatar = new ZUrlBuilder().gravatar().build();

    webAppLearn = new ZWebAppBuilder()
      .id('learn')
      .short('What is Zthunworks')
      .name('Learn')
      .domain('learn.zthunworks.com')
      .icon(gravatar)
      .build();
    webAppRoadblock = new ZWebAppBuilder()
      .id('roadblock')
      .short('Who are you?')
      .name('Roadblock')
      .domain('roadblock.zthunworks.com')
      .build();
    webAppTerms = new ZWebAppBuilder()
      .id('terms')
      .short('What is your right to reject?')
      .name('Terms')
      .source('https://github.com/zthun/works')
      .domain('terms.zthunworks.com')
      .build();

    webApps = [webAppLearn, webAppRoadblock, webAppTerms];

    whoami = webAppLearn._id;

    webAppService = createMocked(['list', 'read']);
    webAppService.list.mockResolvedValue(webApps);
    webAppService.read.mockImplementation((id) => {
      const app = find(webApps, (a) => a._id === id);
      return app ? Promise.resolve(app) : Promise.reject(new Error('App not found'));
    });
  });

  it('should open the nav drawer with given web apps.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = await target.open();
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });

  describe('Items', () => {
    it('should find an item by id (data-name)', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const item = await target.item(webAppTerms._id);
      // Assert
      expect(item).toBeTruthy();
    });

    it('should find an item by display name', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const item = await target.item(webAppTerms.name!);
      // Assert
      expect(item).toBeTruthy();
    });

    it('should not return items that do not have a matching name or header', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const item = await target.item('LOL Wut?');
      // Assert
      expect(item).toBeNull();
    });
  });

  describe('Home', () => {
    it('should navigate to home (visible to everyone).', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const item = await target.home();
      await item.click();
      // Assert
      expect(history.location.pathname).toEqual('/');
    });

    it('should navigate to a custom home route.', async () => {
      // Arrange.
      home = '/path/to/home';
      const target = await createTestTarget();
      // Act.
      const item = await target.home();
      await item.click();
      // Assert.
      expect(history.location.pathname).toEqual(home);
    });

    it('should render the whoami name if the home app fails to load', async () => {
      // Arrange.
      whoami = 'i-do-not-exist';
      const expected = startCase(whoami);
      const target = await createTestTarget();
      // Act.
      const item = await target.home();
      const actual = await item.heading();
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Apps', () => {
    it('should not render any applications if the app list fails to load.', async () => {
      // Arrange
      webAppService.list.mockRejectedValue(new Error('Failed to load apps'));
      const target = await createTestTarget();
      // Act
      const actual = await target.apps();
      // Assert
      expect(actual.length).toBeFalsy();
    });

    it('should list all the apps.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.apps();
      // Assert
      expect(actual.length + 1).toEqual(webApps.length);
    });

    it('should not include self in the app list (only source).', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.app(whoami);
      // Arrange
      expect(actual).toBeNull();
    });

    it('should navigate to the app when clicked.', async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const actual = await required(target.app(webAppTerms._id));
      await actual.click();
      // Assert.
      expect(win.open).toHaveBeenCalledWith(webAppTerms.domain, '_self');
    });
  });

  describe('Source', () => {
    beforeEach(() => {
      whoami = webAppTerms._id;
    });

    it('should have the source link if it exists.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.source();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should navigate to the source link if the self app is registered and the source is available.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const source = await required(target.source());
      await source.click();
      // Assert
      expect(win.open).toHaveBeenCalledWith(webAppTerms.source, '_blank');
    });

    it('should hide the source link if it does not exist.', async () => {
      // Arrange
      whoami = webAppRoadblock._id;
      const target = await createTestTarget();
      // Act
      const actual = await target.source();
      // Assert
      expect(actual).toBeFalsy();
    });

    it('should hide the source link if the self app is not returned in the list of apps.', async () => {
      // Arrange
      whoami = 'ghost';
      const target = await createTestTarget();
      // Act
      const actual = await target.source();
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
