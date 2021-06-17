/* eslint-disable require-jsdoc */

import { fireEvent, render } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import React from 'react';
import { ZProfileButton } from './profile-button';

describe('ZProfileButton', () => {
  let profile: IZProfile;
  let onLogin: jest.Mock;
  let onProfile: jest.Mock;
  let disabled: boolean;

  beforeEach(() => {
    onLogin = jest.fn();
    onProfile = jest.fn();
    disabled = false;
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();
  });

  async function createTestTarget() {
    return render(<ZProfileButton profile={profile} onLogin={onLogin} onProfile={onProfile} disabled={disabled} />);
  }

  describe('Loading', () => {
    beforeEach(() => {
      profile = undefined;
    });

    it('should show the spinner.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const spinner = target.getByTestId('ZProfileButton-loading');
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
      const actual = target.getByTestId('ZProfileButton-login');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onLogin event when the login button is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileButton-login');
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
      const actual = target.getByTestId('ZProfileButton-profile');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onProfile when the button is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZProfileButton-profile');
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
      const btn = target.getByTestId('ZProfileButton-profile') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
