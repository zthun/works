/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import {
  IZProfile,
  IZRouteOption,
  IZWebApp,
  ZProfileBuilder,
  ZRouteOptionBuilder,
  ZWebAppBuilder
} from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { createMemoryHistory, MemoryHistory } from 'history';
import { kebabCase } from 'lodash';
import React from 'react';
import { ZWebAppsContext } from '../apps/web-apps.context';
import { IZHealthService, ZHealthServiceContext } from '../health/health-service.context';
import { ZIdentityContext } from '../identity/identity.context';
import { ZTestRouter } from '../router/router-dom';
import { ZDataState } from '../state/data-state.class';
import { ZWindowServiceContext } from '../window/window-service.context';
import { ZTopNav } from './top-nav';

describe('ZTopNav', () => {
  let history: MemoryHistory;
  let whoami: string;
  let profileApp: string | undefined;
  let routes: IZRouteOption[] | undefined;
  let profile: ZDataState<IZProfile>;
  let webApps: ZDataState<IZWebApp[]>;
  let health: jest.Mocked<IZHealthService>;
  let $window: jest.Mocked<Window>;

  async function createTestTarget() {
    const target = render(
      <ZWindowServiceContext.Provider value={$window}>
        <ZWebAppsContext.Provider value={webApps}>
          <ZIdentityContext.Provider value={profile}>
            <ZHealthServiceContext.Provider value={health}>
              <ZTestRouter location={history.location} navigator={history}>
                <ZTopNav whoami={whoami} profileApp={profileApp} routes={routes} />
              </ZTestRouter>
            </ZHealthServiceContext.Provider>
          </ZIdentityContext.Provider>
        </ZWebAppsContext.Provider>
      </ZWindowServiceContext.Provider>
    );

    await waitFor(async () => expect(target.container.querySelector('.ZTopNav-root')).toBeTruthy());
    await waitFor(async () => expect(target.container.querySelector('.ZHealthIndicator-ok')).toBeTruthy());

    return target;
  }

  beforeEach(() => {
    history = createMemoryHistory();
    profile = new ZDataState<IZProfile>(undefined);
    webApps = new ZDataState<IZWebApp[]>(undefined);
    routes = undefined;
    whoami = 'home';
    profileApp = undefined;
    $window = createMocked(['open']);

    health = createMocked(['read']);
    health.read.mockResolvedValue(true);
  });

  describe('Home', () => {
    let home: IZWebApp;

    beforeEach(() => {
      home = new ZWebAppBuilder().id('home').name('Home').build();
      webApps = new ZDataState<IZWebApp[]>([home]);
    });

    it('should show a small loading indicator when the apps are loading.', async () => {
      // Arrange
      webApps.set();
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.ZTopNav-home-loading');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should hide the home page button if the whoami app cannot be found.', async () => {
      // Arrange
      whoami = 'hidden';
      const target = await createTestTarget();
      // Act
      const actual = target.queryByText(home.name!);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('should move to the home page (visible to everyone).', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const homeBtn = target.getByText(home.name!);
      fireEvent.click(homeBtn);
      // Assert
      expect(history.location.pathname).toEqual('/');
    });
  });

  describe('Profile', () => {
    let login: IZProfile;
    let profiler: IZWebApp;
    let other: IZWebApp;
    let apps: IZWebApp[];

    beforeEach(() => {
      profiler = new ZWebAppBuilder().id('profiler').name('Profiler').domain('https://profiler.zthunworks.com').build();
      other = new ZWebAppBuilder().id('other').name('Other').domain('other.zthunworks.com').build();
      apps = [profiler, other];
      webApps = new ZDataState(apps);

      login = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();
      profile = new ZDataState(login);
    });

    function findProfileButton(target: RenderResult) {
      return target.container.querySelector('.ZIdentityButton-profile');
    }

    it('should render the profile button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = findProfileButton(target);
      // Assert
      expect(btn).toBeTruthy();
    });

    it('should not navigate anywhere if the app list does not exist yet.', async () => {
      // Arrange
      webApps = new ZDataState<IZWebApp[]>(null);
      const target = await createTestTarget();
      // Act
      const btn = findProfileButton(target);
      fireEvent.click(btn!);
      // Assert
      expect($window.open).not.toHaveBeenCalled();
    });

    it('should not navigate anywhere if the profileApp is not returned in the list of apps.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = findProfileButton(target);
      fireEvent.click(btn!);
      // Assert
      expect($window.open).not.toHaveBeenCalled();
    });

    it('should navigate the user to the profileApp.', async () => {
      // Arrange
      profileApp = 'profiler';
      const target = await createTestTarget();
      // Act
      const btn = findProfileButton(target);
      fireEvent.click(btn!);
      // Assert
      expect($window.open).toHaveBeenCalledWith(profiler.domain, '_self');
    });
  });

  describe('Drawer', () => {
    async function openNavDrawer(target: RenderResult) {
      await act(async () => {
        const more = target.getByTestId('ZTopNav-btn-more');
        fireEvent.click(more);
      });
      return target.getByTestId('ZTopNav-drawer-more');
    }

    async function findMenuItem(drawer: HTMLElement, id: string) {
      const key = kebabCase(id);
      const clasz = `.ZTopNav-drawer-more-item-${key}`;
      return drawer.querySelector(clasz);
    }

    async function clickMenuItem(drawer: HTMLElement, id: string) {
      await act(async () => {
        const item = await findMenuItem(drawer, id);
        fireEvent.click(item!);
      });
    }

    it('should open the nav drawer.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await openNavDrawer(target);
      // Assert
      expect(actual).toBeTruthy();
    });

    describe('Home', () => {
      it('should navigate to home (visible to everyone).', async () => {
        // Arrange
        const home = new ZWebAppBuilder().id('home').name('Home').domain('https://home.zthunworks.com').build();
        webApps = new ZDataState([home]);
        whoami = home._id;
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        await clickMenuItem(drawer, 'home');
        // Assert
        expect(history.location.pathname).toEqual('/');
      });
    });

    describe('Apps', () => {
      let roadblock: IZWebApp;
      let portal: IZWebApp;
      let legal: IZWebApp;
      let apps: IZWebApp[];

      beforeEach(() => {
        roadblock = new ZWebAppBuilder()
          .id('roadblock')
          .name('Roadblock')
          .domain('https://roadblock.zthunworks.com')
          .source('https://github.com/zthun/roadblock')
          .build();
        portal = new ZWebAppBuilder()
          .id('portal')
          .name('Portal')
          .domain('https://portal.zthunworks.com')
          .source('https://github.com/zthun/portal')
          .build();
        legal = new ZWebAppBuilder()
          .id('legal')
          .name('Legal')
          .domain('https://legal.zthunworks.com')
          .source('https://github.com/zthun/legal')
          .build();
        apps = [roadblock, portal, legal];
        webApps = new ZDataState(apps);
      });

      it('should render a loading indicator while apps are loading.', async () => {
        // Arrange
        webApps = new ZDataState<IZWebApp[]>(undefined);
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelector('.ZCircularProgress-root');
        // Assert
        expect(actual).toBeTruthy();
      });

      it('should not render any applications if the app list fails to load.', async () => {
        // Arrange
        webApps = new ZDataState<IZWebApp[]>(null);
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelectorAll('.ZTopNav-drawer-more-item');
        // Assert
        expect(actual.length).toBeFalsy();
      });

      it('should list all the apps.', async () => {
        // Arrange
        const target = await createTestTarget();
        const expected = apps.length;
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelectorAll('.ZTopNav-drawer-more-item');
        // Assert
        expect(actual.length).toEqual(expected);
      });

      it('should not include self in the app list (only source).', async () => {
        // Arrange
        whoami = portal._id;
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelector(`.ZTopNav-drawer-more-item-${whoami}`);
        // Arrange
        expect(actual).toBeFalsy();
      });

      it('should not include the profileApp.', async () => {
        // Arrange
        profileApp = roadblock._id;
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelector(`.ZTopNav-drawer-more-item-${profileApp}`);
        // Arrange
        expect(actual).toBeFalsy();
      });
    });

    describe('Routes', () => {
      let information: IZRouteOption;
      let version: IZRouteOption;

      beforeEach(() => {
        information = new ZRouteOptionBuilder().name('Information').path('/information').build();
        version = new ZRouteOptionBuilder().name('Version').path('/version').build();
        routes = [information, version];
      });

      it('should render the route list.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Assert
        const drawer = await openNavDrawer(target);
        const informationItem = await findMenuItem(drawer, information.path);
        const versionItem = await findMenuItem(drawer, version.path);
        // Assert
        expect(informationItem && versionItem).toBeTruthy();
      });

      it('should push the route path into the history when clicked.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Assert
        const drawer = await openNavDrawer(target);
        await clickMenuItem(drawer, version.path);
        // Assert
        expect(history.location.pathname).toEqual(version.path);
      });
    });

    describe('Source', () => {
      let me: IZWebApp;

      beforeEach(() => {
        me = new ZWebAppBuilder()
          .id('myself')
          .domain('https://myself.zthunworks.com')
          .name('Myself')
          .source('https://github.com/zthun/works')
          .build();
        webApps = new ZDataState([me]);
        whoami = 'myself';
      });

      it('should have the source link if it exists.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = await findMenuItem(drawer, 'github');
        // Assert
        expect(actual).toBeTruthy();
      });

      it('should hide the source link if it does not exist.', async () => {
        // Arrange
        delete me.source;
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = await findMenuItem(drawer, 'github');
        // Assert
        expect(actual).toBeFalsy();
      });

      it('should hide the source link if the self app is not returned in the list of apps.', async () => {
        // Arrange
        whoami = 'ghost';
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = await findMenuItem(drawer, 'github');
        // Assert
        expect(actual).toBeFalsy();
      });

      it('should navigate to the source link if the self app is registered and the source is available.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        await clickMenuItem(drawer, 'github');
        // Assert
        expect($window.open).toHaveBeenCalledWith(me.source, '_blank');
      });
    });
  });
});
