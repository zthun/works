import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ZProfileBuilder } from '@zthun/works.core';
import { IZAlertStack, IZLoginState, ZAlertStack, ZAlertStackContext, ZLoginStateContext, ZLoginStateStatic } from '@zthun/works.react';
import Axios from 'axios';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { ZthunworksMenu } from './works-menu';

jest.mock('axios');

describe('ZthunworksMenu', () => {
  let history: MemoryHistory;
  let alerts: IZAlertStack;
  let loginState: IZLoginState;

  async function createTestTarget() {
    return render(
      <ZAlertStackContext.Provider value={alerts}>
        <ZLoginStateContext.Provider value={loginState}>
          <Router history={history}>
            <ZthunworksMenu />
          </Router>
        </ZLoginStateContext.Provider>
      </ZAlertStackContext.Provider>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory();
    loginState = new ZLoginStateStatic();
    alerts = new ZAlertStack();

    (Axios.delete as jest.Mock).mockClear();
  });

  it('renders the menu', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZthunworksMenu-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Profile state', () => {
    describe('Loading', () => {
      it('shows the loader while the profile state is loading.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        const actual = target.getByTestId('ZthunworksMenu-progress-loading');
        // Assert
        expect(actual).toBeTruthy();
      });
    });

    describe('Logged out.', () => {
      beforeEach(() => {
        loginState = new ZLoginStateStatic(null);
      });

      it('should move to the login page when the profile menu is clicked.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        await act(async () => {
          const actual = target.getByText('LOGIN');
          fireEvent.click(actual);
        });
        // Assert
        expect(history.location.pathname).toEqual('/login');
      });
    });

    describe('Logged in.', () => {
      let menu: string;

      beforeEach(() => {
        menu = 'Gambit';
        loginState = new ZLoginStateStatic(new ZProfileBuilder().email('gambit@marvel.com').display(menu).build());
      });

      function openMenu(target: RenderResult) {
        const profileMenu = target.getByText(menu);
        fireEvent.click(profileMenu);
      }

      it('should move to the profile page when the profile menu item is clicked.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        await act(async () => openMenu(target));
        const profileMenuItem = target.getByText('PROFILE');
        fireEvent.click(profileMenuItem);
        // Assert
        expect(history.location.pathname).toEqual('/profile');
      });

      it('should log out the user when the logout menu item is clicked.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        await act(async () => openMenu(target));
        const logoutMenuItem = target.getByText('LOGOUT');
        fireEvent.click(logoutMenuItem);
        // Assert
        expect(Axios.delete).toHaveBeenCalledWith(expect.stringContaining('tokens'));
      });

      it('should notify the user that an error has occurred when logging out.', async () => {
        // Arrange
        const target = await createTestTarget();
        const error = 'Can not log out.';
        (Axios.delete as jest.Mock).mockRejectedValue(error);
        // Act
        await act(async () => openMenu(target));
        await act(async () => {
          const logoutMenuItem = target.getByText('LOGOUT');
          fireEvent.click(logoutMenuItem);
        });
        // Assert
        expect(alerts.list[0].message).toEqual(error);
      });
    });
  });

  describe('Home', () => {
    it('should move to the home page (visible to everyone).', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const home = target.getByText('ZTHUNWORKS');
      fireEvent.click(home);
      // Assert
      expect(history.location.pathname).toEqual('/home');
    });
  });
});
