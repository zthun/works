/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */

import { ZCircusPerformer, ZCircusSetupRender, ZCircusWait } from '@zthun/works.cirque-du-react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { ZIdentityButton } from './identity-button';
import { ZIdentityButtonComponentModel } from './identity-button.cm';
import { IZIdentityService, ZIdentityServiceContext } from './identity-service.context';

describe('ZIdentityButton', () => {
  const performer = new ZCircusPerformer();
  const waiter = new ZCircusWait();

  let profile: IZProfile | null | undefined;
  let profiles: jest.Mocked<IZIdentityService>;
  let onLogin: jest.Mock | undefined;
  let onProfile: jest.Mock | undefined;
  let disabled: boolean | undefined;

  beforeEach(() => {
    onLogin = undefined;
    onProfile = undefined;
    disabled = undefined;
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();

    profiles = createMocked<IZIdentityService>(['getDisplay', 'getAvatar']);
    profiles.getDisplay.mockResolvedValue('Display');
    profiles.getAvatar.mockResolvedValue(new ZUrlBuilder().gravatar().build());
  });

  async function createTestTarget() {
    const element = (
      <ZIdentityServiceContext.Provider value={profiles}>
        <ZIdentityButton profile={profile} onLogin={onLogin} onProfile={onProfile} disabled={disabled} />
      </ZIdentityServiceContext.Provider>
    );

    const result = await new ZCircusSetupRender(element).setup();
    await waiter.wait(() => !!ZIdentityButtonComponentModel.find(result.container).length);
    const [target] = ZIdentityButtonComponentModel.find(result.container);
    return new ZIdentityButtonComponentModel(target, performer, waiter);
  }

  describe('Loading', () => {
    beforeEach(() => {
      profile = undefined;
    });

    it('should show the spinner.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.loading();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should be considered disabled.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = await target.disabled();
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Unauthenticated', () => {
    beforeEach(() => {
      profile = null;
    });

    it('shows the login button.', async () => {
      // Arrange
      const target = await createTestTarget();
      await target.load();
      // Act
      const actual = await target.unauthenticated();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onLogin event when the login button is clicked.', async () => {
      // Arrange
      onLogin = jest.fn();
      const target = await createTestTarget();
      await target.load();
      // Act
      await target.click();
      // Assert
      expect(onLogin).toHaveBeenCalled();
    });

    it('should disable the button.', async () => {
      // Arrange
      disabled = true;
      const target = await createTestTarget();
      await target.load();
      // Act
      const actual = await target.disabled();
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Authenticated', () => {
    it('renders the profile button.', async () => {
      // Arrange
      const target = await createTestTarget();
      await target.load();
      // Act
      const actual = await target.authenticated();
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onProfile when the button is clicked.', async () => {
      // Arrange
      onProfile = jest.fn();
      const target = await createTestTarget();
      await target.load();
      // Act
      await target.click();
      // Assert
      expect(onProfile).toHaveBeenCalled();
    });

    it('should disable the button.', async () => {
      // Arrange
      disabled = true;
      const target = await createTestTarget();
      await target.load();
      // Act
      const actual = await target.disabled();
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
