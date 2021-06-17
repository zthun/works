/* eslint-disable require-jsdoc */
import { fireEvent, render } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { IZAlertStack, IZDataState, ZAlertStack, ZAlertStackContext, ZDataStateStatic, ZLoginStateContext } from '@zthun/works.react';
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

  describe('Profile state', () => {
    describe('Logged out.', () => {
      beforeEach(() => {
        loginState = new ZDataStateStatic<IZProfile>(null);
      });

      it('should move to the login page when the profile menu is clicked.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        await act(async () => {
          const actual = target.getByTestId('ZProfileButton-login');
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

      it('should move to the profile page when the profile menu item is clicked.', async () => {
        // Arrange
        const target = await createTestTarget();
        // Act
        await act(async () => {
          const btn = target.getByTestId('ZProfileButton-avatar');
          fireEvent.click(btn);
        });
        // Assert
        expect(history.location.pathname).toEqual('/profile');
      });

      /**
       * TODO:  This needs to be moved to the profile page.
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
      */
    });
  });
});
