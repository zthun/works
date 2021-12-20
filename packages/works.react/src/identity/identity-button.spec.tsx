/* eslint-disable require-jsdoc */

import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { delay, lastValueFrom, of } from 'rxjs';
import { ZIdentityButton } from './identity-button';
import { IZIdentityService, ZIdentityServiceContext } from './identity-service.context';

describe('ZIdentityButton', () => {
  let profile: IZProfile;
  let profiles: jest.Mocked<IZIdentityService>;
  let onLogin: jest.Mock;
  let onProfile: jest.Mock;
  let disabled: boolean;

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
    let target: RenderResult;

    await act(async () => {
      target = render(
        <ZIdentityServiceContext.Provider value={profiles}>
          <ZIdentityButton profile={profile} onLogin={onLogin} onProfile={onProfile} disabled={disabled} />
        </ZIdentityServiceContext.Provider>
      );
      await lastValueFrom(of(true).pipe(delay(2)));
    });

    return target;
  }

  describe('Loading', () => {
    beforeEach(() => {
      profile = undefined;
    });

    it('should show the spinner.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const spinner = target.container.querySelector('.ZIdentityButton-loading');
      // Assert
      expect(spinner).toBeTruthy();
    });
  });

  describe('Unauthenticated', () => {
    beforeEach(() => {
      profile = null;
    });

    it('shows the login button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.ZIdentityButton-login');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onLogin event when the login button is clicked.', async () => {
      // Arrange
      onLogin = jest.fn();
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.ZIdentityButton-login');
      fireEvent.click(actual);
      // Assert
      expect(onLogin).toHaveBeenCalled();
    });
  });

  describe('Authenticated', () => {
    it('renders the profile button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.ZIdentityButton-profile');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onProfile when the button is clicked.', async () => {
      // Arrange
      onProfile = jest.fn();
      const target = await createTestTarget();
      // Act
      const btn = target.container.querySelector('.ZIdentityButton-profile');
      fireEvent.click(btn);
      // Assert
      expect(onProfile).toHaveBeenCalled();
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      disabled = true;
    });

    it('should disable the button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.container.querySelector('.ZIdentityButton-profile') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
