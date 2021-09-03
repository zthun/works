/* eslint-disable require-jsdoc */
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { IZProfile, IZWebApp, ZProfileBuilder, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZDataUrlBuilder, ZMimeTypeImage, ZUrlBuilder } from '@zthun/works.url';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ZWebAppsContext } from '../apps/web-apps.context';
import { ZProfileContext } from '../profile/profile.context';
import { ZDataState } from '../store/data-state.class';
import { ZWindowServiceContext } from '../window/window-service.context';
import { ZTopNav } from './top-nav';

describe('ZTopNav', () => {
  const appName = 'ZTHUNWORKS';

  let history: MemoryHistory;
  let whoami: string;
  let profileApp: string;
  let profile: ZDataState<IZProfile>;
  let webApps: ZDataState<IZWebApp[]>;
  let $window: jest.Mocked<Window>;

  async function createTestTarget() {
    let target: RenderResult;

    await act(async () => {
      target = render(
        <ZWindowServiceContext.Provider value={$window}>
          <ZWebAppsContext.Provider value={webApps}>
            <ZProfileContext.Provider value={profile}>
              <Router history={history}>
                <ZTopNav headerText={appName} whoami={whoami} profileApp={profileApp} />
              </Router>
            </ZProfileContext.Provider>
          </ZWebAppsContext.Provider>
        </ZWindowServiceContext.Provider>
      );
      await waitFor(() => true);
    });

    return target;
  }

  beforeEach(() => {
    history = createMemoryHistory();
    profile = new ZDataState<IZProfile>(undefined);
    webApps = new ZDataState<IZWebApp[]>(undefined);
    whoami = undefined;
    profileApp = undefined;
    $window = createMocked(['open']);
  });

  it('renders the component', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZTopNav-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Home', () => {
    it('should move to the home page (visible to everyone).', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const home = target.getByText(appName);
      fireEvent.click(home);
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
      return target.findByTestId('ZProfileButton-profile');
    }

    it('should render the profile button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = await findProfileButton(target);
      // Assert
      expect(btn).toBeTruthy();
    });

    it('should not navigate anywhere if the app list does not exist yet.', async () => {
      // Arrange
      webApps = new ZDataState(null);
      const target = await createTestTarget();
      // Act
      const btn = await findProfileButton(target);
      fireEvent.click(btn);
      // Assert
      expect($window.open).not.toHaveBeenCalled();
    });

    it('should not navigate anywhere if the profileApp is not returned in the list of apps.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = await findProfileButton(target);
      fireEvent.click(btn);
      // Assert
      expect($window.open).not.toHaveBeenCalled();
    });

    it('should navigate the user to the profileApp.', async () => {
      // Arrange
      profileApp = 'profiler';
      const target = await createTestTarget();
      // Act
      const btn = await findProfileButton(target);
      fireEvent.click(btn);
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
      const clasz = `.ZTopNav-drawer-more-item-${id}`;
      return drawer.querySelector(clasz);
    }

    async function clickMenuItem(drawer: HTMLElement, id: string) {
      await act(async () => {
        const item = await findMenuItem(drawer, id);
        fireEvent.click(item);
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
        roadblock = new ZWebAppBuilder().id('roadblock').name('Roadblock').domain('https://roadblock.zthunworks.com').source('https://github.com/zthun/roadblock').build();
        portal = new ZWebAppBuilder().id('portal').name('Portal').domain('https://portal.zthunworks.com').source('https://github.com/zthun/portal').build();
        legal = new ZWebAppBuilder().id('legal').name('Legal').domain('https://legal.zthunworks.com').source('https://github.com/zthun/legal').build();
        apps = [roadblock, portal, legal];
        webApps = new ZDataState(apps);
      });

      it('should render a loading indicator while apps are loading.', async () => {
        // Arrange
        webApps = new ZDataState(undefined);
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelector('.ZCircularProgress-root');
        // Assert
        expect(actual).toBeTruthy();
      });

      it('should not render any applications if the app list fails to load (only Home shows up).', async () => {
        // Arrange
        webApps = new ZDataState(null);
        const target = await createTestTarget();
        const expected = 1;
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelectorAll('.ZTopNav-drawer-more-item');
        // Assert
        expect(actual.length).toEqual(expected);
      });

      it('should list all the apps (plus home).', async () => {
        // Arrange
        const target = await createTestTarget();
        const expected = apps.length + 1;
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

      it('should render the app icon as a raw svg if it exists.', async () => {
        // Arrange
        portal.icon = new ZDataUrlBuilder()
          .encode('base64')
          .buffer('<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>')
          .mimeType(ZMimeTypeImage.SVG)
          .build();
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelector(`.ZTopNav-drawer-more-item-${portal._id} div.ZTopNav-app-icon`);
        // Assert
        expect(actual).toBeTruthy();
      });

      it('should render the app icon as a raster image if the url is not a svg data url.', async () => {
        // Arrange
        portal.icon = new ZUrlBuilder().gravatar().build();
        const target = await createTestTarget();
        // Act
        const drawer = await openNavDrawer(target);
        const actual = drawer.querySelector(`.ZTopNav-drawer-more-item-${portal._id} img.ZTopNav-app-icon`);
        // Assert
        expect(actual).toBeTruthy();
      });
    });

    describe('Source', () => {
      let me: IZWebApp;

      beforeEach(() => {
        me = new ZWebAppBuilder().id('myself').domain('https://myself.zthunworks.com').name('Myself').source('https://github.com/zthun/works').build();
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
