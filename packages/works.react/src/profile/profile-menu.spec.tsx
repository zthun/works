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

  beforeEach(() => {
    onLogin = jest.fn();
    onLogout = jest.fn();
    hideLogout = false;
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();
  });

  async function createTestTarget() {
    const target = render(
      <ZProfileMenu profile={profile} hideLogout={hideLogout} onLogin={onLogin} onLogout={onLogout}>
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

  describe('Authenticted', () => {
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

    it('shows the display name of the user if the display name is set.', async () => {
      // Arrange
      const target = await createTestTarget();
      const expected = profile.display.toUpperCase();
      // Act
      const btn = target.getByTestId('ZProfileMenu-btn-profile');
      const actual = btn.textContent.toUpperCase();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('shows the user email if the display name is not set.', async () => {
      // Arrange
      delete profile.display;
      const target = await createTestTarget();
      const expected = profile.email.toUpperCase();
      // Act
      const btn = target.getByTestId('ZProfileMenu-btn-profile');
      const actual = btn.textContent.toUpperCase();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
