/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */

import { ZCircusComponentModel } from '@zthun/works.cirque';
import { ZCircusSetupRenderer } from '@zthun/works.cirque-du-react';
import { IZProfile, IZWebApp, ZProfileBuilder, ZWebAppBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { noop } from 'lodash';
import React from 'react';
import { IZWebAppService, ZWebAppServiceContext } from '../apps/web-app-service';
import { ZWindowServiceContext } from '../window/window-service';
import { ZIdentityButton } from './identity-button';
import { ZIdentityButtonComponentModel } from './identity-button.cm';
import { IZIdentityService, ZIdentityServiceContext } from './identity-service';

describe('ZIdentityButton', () => {
  let profileApp: string | undefined;
  let identityService: jest.Mocked<IZIdentityService>;
  let webAppService: jest.Mocked<IZWebAppService>;
  let win: jest.Mocked<typeof globalThis>;

  beforeEach(() => {
    profileApp = undefined;

    identityService = createMocked(['read']);
    identityService.read.mockRejectedValue(new Error('Identity not found'));

    webAppService = createMocked(['read']);
    webAppService.read.mockRejectedValue(new Error('App not found'));

    win = createMocked(['open']);
  });

  async function createTestTarget() {
    const element = (
      <ZWindowServiceContext.Provider value={win}>
        <ZWebAppServiceContext.Provider value={webAppService}>
          <ZIdentityServiceContext.Provider value={identityService}>
            <ZIdentityButton profileApp={profileApp} />
          </ZIdentityServiceContext.Provider>
        </ZWebAppServiceContext.Provider>
      </ZWindowServiceContext.Provider>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusComponentModel.create(driver, ZIdentityButtonComponentModel, ZIdentityButtonComponentModel.Selector);
  }

  async function createTestTargetAndLoad() {
    const target = await createTestTarget();
    const button = await target.button();
    await button.load();
    return target;
  }

  async function assertButtonDisplay(expected: string) {
    // Arrange.
    const target = await createTestTargetAndLoad();
    const button = await target.button();
    // Act.
    const actual = await button.text();
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe('Loading', () => {
    it('should show the spinner.', async () => {
      // Arrange
      identityService.read.mockResolvedValue(new Promise(noop));
      const target = await createTestTarget();
      // Act
      const actual = await (await target.button()).loading();
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Unauthenticated', () => {
    beforeEach(() => {
      identityService.read.mockResolvedValue(null);
    });

    it('show not be authenticated.', async () => {
      // Arrange
      const target = await createTestTargetAndLoad();
      // Act
      const actual = await target.authenticated();
      // Assert
      expect(actual).toBeFalsy();
    });

    it('should show the login text.', async () => {
      await assertButtonDisplay('LOGIN');
    });
  });

  describe('Authenticated', () => {
    it('renders the profile button.', async () => {
      // Arrange
      identityService.read.mockResolvedValue(new ZProfileBuilder().build());
      const target = await createTestTargetAndLoad();
      // Act
      const actual = await target.authenticated();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should display the users display name before the email if set', async () => {
      const avatar = 'path/to/assets/my-avatar.svg';
      const expected = 'Gambit';
      const profile = new ZProfileBuilder().display(expected).email('gambit@marvel.com').avatar(avatar).build();
      identityService.read.mockResolvedValue(profile);
      await assertButtonDisplay(expected);
    });

    it('should display the users email if no display is set', async () => {
      const expected = 'gambit@marvel.com';
      const profile = new ZProfileBuilder().email(expected).build();
      identityService.read.mockResolvedValue(profile);
      await assertButtonDisplay(expected);
    });
  });

  describe('Navigation', () => {
    let app: IZWebApp;
    let profile: IZProfile;

    beforeEach(() => {
      app = new ZWebAppBuilder().id('learn').domain('https://learn.zthunworks.com').build();
      profile = new ZProfileBuilder().display('Gambit').email('gambit@marvel.com').build();
      profileApp = app._id;

      identityService.read.mockResolvedValue(profile);
      webAppService.read.mockResolvedValue(app);
    });

    async function assertOpenNotCalled() {
      const target = await createTestTargetAndLoad();
      // Act
      await (await target.button()).click();
      // Assert
      expect(win.open).not.toHaveBeenCalled();
    }

    it('does not route to anything if the profile app is not loaded', async () => {
      webAppService.read.mockRejectedValue(new Error('App not loaded'));
      await assertOpenNotCalled();
    });

    it('does not route to anything if the identity is not loaded', async () => {
      identityService.read.mockRejectedValue(new Error('Identity failed to load'));
      await assertOpenNotCalled();
    });

    it('does not route to anything if profile app is not set', async () => {
      profileApp = undefined;
      await assertOpenNotCalled();
    });

    it('routes to the profile app when the button is clicked.', async () => {
      // Arrange
      const target = await createTestTargetAndLoad();
      // Act
      await (await target.button()).click();
      // Assert
      expect(win.open).toHaveBeenCalledWith(app.domain, '_self');
    });
  });
});
