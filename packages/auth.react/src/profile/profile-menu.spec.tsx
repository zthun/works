import { MenuItem } from '@material-ui/core';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/auth.core';
import React from 'react';
import { ZLoginState } from '../login/login-state.class';
import { ZLoginStateContext } from '../login/login-state.context';
import { ZProfileMenu } from './profile-menu';

describe('ZProfileMenu', () => {
  let profile: IZProfile;
  let state: ZLoginState;
  let onLogin: jest.Mock;
  let onLogout: jest.Mock;
  let hideLogout: boolean;

  beforeEach(() => {
    onLogin = jest.fn();
    onLogout = jest.fn();
    hideLogout = false;
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();
    state = new ZLoginState(() => Promise.resolve(profile));
  });

  async function createTestTarget() {
    const target = render(
      <ZLoginStateContext.Provider value={state}>
        <ZProfileMenu hideLogout={hideLogout} onLogin={onLogin} onLogout={onLogout}>
          <MenuItem>Child</MenuItem>
        </ZProfileMenu>
      </ZLoginStateContext.Provider>
    );
    await state.refresh();
    return target;
  }

  it('renders the component.', async () => {
    // Arrange
    let target: RenderResult;
    // Act
    await act(async () => {
      target = await createTestTarget();
    });
    const actual = target.getByTestId('ZProfileMenu-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Loading', () => {
    beforeEach(() => {
      state = new ZLoginState(() => Promise.resolve(undefined));
    });

    it('shows a circular progress when the profile is loading.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZProfileMenu-loading');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Unauthenticated', () => {
    beforeEach(() => {
      state = new ZLoginState(() => Promise.resolve(null));
    });

    it('shows the login button.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZProfileMenu-btn-login');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onLogin event when the login button is clicked.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZProfileMenu-btn-login');
      fireEvent.click(actual);
      // Assert
      expect(onLogin).toHaveBeenCalled();
    });
  });

  describe('Authenticted', () => {
    function openMenu(target: RenderResult) {
      const btn = target.getByTestId('ZProfileMenu-btn-profile');
      fireEvent.click(btn);
    }

    it('renders the profile button.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZProfileMenu-btn-profile');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('invokes the onLogout when the logout menu item is clicked.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
        openMenu(target);
      });
      const logout = target.getByTestId('ZProfileMenu-menuitem-logout');
      fireEvent.click(logout);
      // Assert
      expect(onLogout).toHaveBeenCalled();
    });

    it('does not show the logout button if hideLogout is true.', async () => {
      // Arrange
      let target: RenderResult;
      hideLogout = true;
      // Act
      await act(async () => {
        target = await createTestTarget();
        openMenu(target);
      });
      const logout = target.queryByTestId('ZProfileMenu-menuitem-logout');
      // Assert
      expect(logout).toBeFalsy();
    });

    it('shows the display name of the user if the display name is set.', async () => {
      // Arrange
      let target: RenderResult;
      const expected = profile.display.toUpperCase();
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const btn = target.getByTestId('ZProfileMenu-btn-profile');
      const actual = btn.textContent.toUpperCase();
      // Assert
      expect(actual).toEqual(expected);
    });

    it('shows the user email if the display name is not set.', async () => {
      // Arrange
      let target: RenderResult;
      const expected = profile.email.toUpperCase();
      delete profile.display;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const btn = target.getByTestId('ZProfileMenu-btn-profile');
      const actual = btn.textContent.toUpperCase();
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
