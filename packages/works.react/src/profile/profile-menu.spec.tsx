/* eslint-disable require-jsdoc */

import { MenuItem } from '@material-ui/core';
import { fireEvent, render } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import React from 'react';
import { ZProfileMenu } from './profile-menu';

describe('ZProfileMenu', () => {
  let profile: IZProfile;
  let onLogin: jest.Mock;
  let onLogout: jest.Mock;
  let hideLogout: boolean;
  let loading: boolean;
  let disabled: boolean;

  beforeEach(() => {
    onLogin = jest.fn();
    onLogout = jest.fn();
    hideLogout = false;
    loading = false;
    disabled = false;
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();
  });

  async function createTestTarget() {
    const target = render(
      <ZProfileMenu profile={profile} hideLogout={hideLogout} onLogin={onLogin} onLogout={onLogout} loading={loading} disabled={disabled}>
        <MenuItem>Child</MenuItem>
      </ZProfileMenu>
    );
    return target;
  }

  it('renders the component.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZProfileMenu-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Unauthenticated', () => {
    beforeEach(() => {
      profile = null;
    });

    it('shows the login button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileMenu-btn-login');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onLogin event when the login button is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileMenu-btn-login');
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
      const actual = target.getByTestId('ZProfileMenu-btn-profile');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onLogout when the logout menu item is clicked.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZProfileMenu-btn-profile');
      fireEvent.click(btn);
      const logout = target.getByTestId('ZProfileMenu-menuitem-logout');
      fireEvent.click(logout);
      // Assert
      expect(onLogout).toHaveBeenCalled();
    });

    it('does not show the logout button if hideLogout is true.', async () => {
      // Arrange
      hideLogout = true;
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZProfileMenu-btn-profile');
      fireEvent.click(btn);
      const logout = target.queryByTestId('ZProfileMenu-menuitem-logout');
      // Assert
      expect(logout).toBeFalsy();
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
      const btn = target.getByTestId('ZProfileMenu-btn-profile') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Loading', () => {
    beforeEach(() => {
      loading = true;
    });
    it('should show the spinner.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const spinner = target.getByTestId('ZProfileMenu-progress-loading');
      // Assert
      expect(spinner).toBeTruthy();
    });

    it('should not show the spinner if not loading.', async () => {
      // Arrange
      loading = false;
      const target = await createTestTarget();
      // Act
      const spinner = target.queryByTestId('ZProfileMenu-progress-loading');
      // Assert
      expect(spinner).toBeFalsy();
    });
  });
});
