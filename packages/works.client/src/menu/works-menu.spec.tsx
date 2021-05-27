/* eslint-disable require-jsdoc */
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { IZAlertStack, IZDataState, ZAlertStack, ZAlertStackContext, ZLoginStateContext, ZDataStateStatic } from '@zthun/works.react';
import Axios from 'axios';
import { createMemoryHistory, MemoryHistory } from 'history';
import { identity, kebabCase } from 'lodash';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { ZthunworksMenu } from './works-menu';

jest.mock('axios');

describe('ZthunworksMenu', () => {
  let history: MemoryHistory;
  let alerts: IZAlertStack;
  let loginState: IZDataState<IZProfile>;

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
    loginState = new ZDataStateStatic<IZProfile>();
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
        loginState = new ZDataStateStatic<IZProfile>(null);
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
        loginState = new ZDataStateStatic(new ZProfileBuilder().email('gambit@marvel.com').display(menu).build());
      });

      function openMenu(target: RenderResult) {
        const profileMenu = target.getByTestId('ZProfileMenu-avatar');
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
        await act(async () => {
          const logoutMenuItem = target.getByText('LOGOUT');
          fireEvent.click(logoutMenuItem);
        });
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

  describe('More', () => {
    function openNavDrawer(target: RenderResult) {
      const more = target.getByTestId('ZthunworksMenu-btn-more');
      fireEvent.click(more);
      return target.getByTestId('ZthunworksMenu-drawer-more');
    }

    function clickMenuItem(drawer: HTMLElement, name: string) {
      const kebab = kebabCase(name);
      const clasz = `.ZthunworksMenu-drawer-more-item-${kebab}`;
      const item = drawer.querySelector(clasz);
      fireEvent.click(item);
    }

    async function assertPushesHistory(expected: string, item: string) {
      // Arrange
      const target = await createTestTarget();
      const drawer = openNavDrawer(target);
      // Act
      clickMenuItem(drawer, item);
      // Assert
      expect(history.location.pathname).toEqual(expected);
    }

    async function assertOpensWindow(expected: string, item: string) {
      // Arrange
      jest.spyOn(window, 'open').mockImplementation(identity.bind(null, window));
      const target = await createTestTarget();
      const drawer = openNavDrawer(target);
      // Act
      clickMenuItem(drawer, item);
      // Assert
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining(expected), '_blank');
    }

    it('should open the nav drawer.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = openNavDrawer(target);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should move to the home page.', async () => {
      await assertPushesHistory('/home', 'Home');
    });

    it('should move to the terms page.', async () => {
      await assertPushesHistory('/terms', 'Terms');
    });

    it('should move to the privacy page.', async () => {
      await assertPushesHistory('/privacy', 'Privacy');
    });

    it('should open github for zthunworks.', async () => {
      await assertOpensWindow('github.com', 'GitHub');
    });

    it('should open the mailto contact for zthunworks.', async () => {
      await assertOpensWindow('mailto:', 'Contact');
    });
  });
});
