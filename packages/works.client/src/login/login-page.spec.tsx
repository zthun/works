import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ZProfileBuilder } from '@zthun/works.core';
import { IZAlertStack, IZLoginState, ZAlertSeverity, ZAlertStack, ZAlertStackContext, ZLoginStateContext, ZLoginStateStatic } from '@zthun/works.react';
import Axios from 'axios';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ZLoginPage } from './login-page';

jest.mock('axios');

describe('ZLoginPage', () => {
  let state: IZLoginState;
  let alerts: IZAlertStack;

  async function createTestTarget() {
    const target = render(
      <ZAlertStackContext.Provider value={alerts}>
        <ZLoginStateContext.Provider value={state}>
          <MemoryRouter>
            <ZLoginPage />
          </MemoryRouter>
        </ZLoginStateContext.Provider>
      </ZAlertStackContext.Provider>
    );
    await state.refresh();
    return target;
  }

  beforeEach(() => {
    state = new ZLoginStateStatic(null);
    alerts = new ZAlertStack();
  });

  describe('Display', () => {
    it('shows a circular progress if the profile is loading.', async () => {
      // Arrange
      state = new ZLoginStateStatic(undefined);
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZLoginPage-progress-loading');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('shows the login tabs if the user is not logged in.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZLoginTabs-root');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('redirects to the profile page if the user is logged in.', async () => {
      // Arrange
      state = new ZLoginStateStatic(new ZProfileBuilder().display('Gambit').email('gambit@marvel.com').build());
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const progress = target.queryByTestId('ZLoginPage-progress-loading');
      const tabs = target.queryByTestId('ZLoginPage-tabs');
      // Assert
      expect(progress).toBeFalsy();
      expect(tabs).toBeFalsy();
    });
  });

  describe('Tabs', () => {
    beforeEach(() => {
      Axios.post = jest.fn().mockResolvedValue(Promise.resolve());
    });

    function getActionButton(index: number, target: RenderResult) {
      return target.getAllByTestId('ZLoginCredentialsForm-btn-action')[index];
    }

    const getLoginActionButton = getActionButton.bind(null, 0);
    const getCreateActionButton = getActionButton.bind(null, 1);

    describe('Login', () => {
      it('should run the login.', async () => {
        // Arrange
        let target: RenderResult;
        await act(async () => {
          target = await createTestTarget();
        });
        // Act
        fireEvent.click(getLoginActionButton(target));
        // Assert
        expect(Axios.post).toHaveBeenCalledWith(expect.stringContaining('tokens'), expect.anything());
      });

      it('should notifiy the user of a successful login.', async () => {
        // Arrange
        let target: RenderResult;
        await act(async () => {
          target = await createTestTarget();
        });
        // Act
        fireEvent.click(getLoginActionButton(target));
        await of(true).pipe(delay(0)).toPromise();
        // Assert
        expect(alerts.list[0].severity).toEqual(ZAlertSeverity.Success);
      });

      it('should alert the user if the login fails.', async () => {
        // Arrange
        Axios.post = jest.fn().mockRejectedValue('failed');
        let target: RenderResult;
        await act(async () => {
          target = await createTestTarget();
        });
        // Act
        fireEvent.click(getLoginActionButton(target));
        await of(true).pipe(delay(0)).toPromise();
        // Assert
        expect(alerts.list[0].severity).toEqual(ZAlertSeverity.Error);
      });
    });

    describe('Create', () => {
      it('should run the create user workflow.', async () => {
        // Arrange
        let target: RenderResult;
        await act(async () => {
          target = await createTestTarget();
        });
        // Act
        fireEvent.click(getCreateActionButton(target));
        // Assert
        expect(Axios.post).toHaveBeenCalledWith(expect.stringContaining('users'), expect.anything());
      });

      it('should notifiy the user of a successful creation.', async () => {
        // Arrange
        let target: RenderResult;
        await act(async () => {
          target = await createTestTarget();
        });
        // Act
        fireEvent.click(getCreateActionButton(target));
        await of(true).pipe(delay(0)).toPromise();
        // Assert
        expect(alerts.list[0].severity).toEqual(ZAlertSeverity.Success);
      });

      it('should alert the user if the login fails.', async () => {
        // Arrange
        Axios.post = jest.fn().mockRejectedValue('failed');
        let target: RenderResult;
        await act(async () => {
          target = await createTestTarget();
        });
        // Act
        fireEvent.click(getCreateActionButton(target));
        await of(true).pipe(delay(0)).toPromise();
        // Assert
        expect(alerts.list[0].severity).toEqual(ZAlertSeverity.Error);
      });
    });
  });
});
