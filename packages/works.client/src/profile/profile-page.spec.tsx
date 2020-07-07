import { act, render, RenderResult, fireEvent } from '@testing-library/react';
import { ZLoginState, ZLoginStateContext, IZLoginState, IZAlertStack, ZAlertStackContext, ZAlertStack, ZAlertSeverity, ZLoginStateStatic } from '@zthun/works.react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ZProfilePage } from './profile-page';
import Axios from 'axios';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { v4 } from 'uuid';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

jest.mock('axios');

describe('ZProfilePage', () => {
  let profile: IZProfile;
  let state: IZLoginState;
  let alerts: IZAlertStack;

  async function createTestTarget() {
    const target = render(
      <ZAlertStackContext.Provider value={alerts}>
        <ZLoginStateContext.Provider value={state}>
          <MemoryRouter>
            <ZProfilePage />
          </MemoryRouter>
        </ZLoginStateContext.Provider>
      </ZAlertStackContext.Provider>
    );
    await state.refresh();
    return target;
  }

  beforeEach(() => {
    profile = undefined;
    state = new ZLoginStateStatic(profile);
    alerts = new ZAlertStack(1);
  });

  it('renders the page', async () => {
    // Arrange
    let target: RenderResult;
    // Act
    await act(async () => {
      target = await createTestTarget();
    });
    const actual = target.getByTestId('ZProfilePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Loading', () => {
    it('renders the loading icon if the login state profile is undefined.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZProfilePage-progress-profile-loading');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Logged out', () => {
    beforeEach(() => {
      profile = null;
      state = new ZLoginStateStatic(profile);
    });

    it('redirects to the login page.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const loading = target.queryByTestId('ZProfilePage-progress-profile-loading');
      const profileEditor = target.queryByTestId('ZProfileForm-root');
      const activationEditor = target.queryByTestId('ZProfileActivationForm-root');
      const stay = loading || profileEditor || activationEditor;
      // Assert
      expect(stay).toBeFalsy();
    });
  });

  describe('Not activated', () => {
    beforeEach(() => {
      profile = new ZProfileBuilder().email('gambit@marvel.com').build();
      state = new ZLoginStateStatic(profile);
    });

    async function setKey(target: RenderResult, key: string) {
      const keyField = target.getByTestId('ZProfileActivationForm-input-key').getElementsByTagName('input').item(0);
      keyField.value = key;
      fireEvent.input(keyField);
      await of(true).pipe(delay(0)).toPromise();
    }

    async function clickActivateButton(target: RenderResult) {
      const activation = target.getByTestId('ZProfileActivationForm-btn-activate') as HTMLButtonElement;
      fireEvent.click(activation);
      await of(true).pipe(delay(0)).toPromise();
    }

    it('displays the profile activation form.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const activationEditor = target.getByTestId('ZProfileActivationForm-root');
      // Assert
      expect(activationEditor).toBeTruthy();
    });

    it('activates the profile.', async () => {
      // Arrange
      let target: RenderResult;
      const key = v4();
      // Act
      await act(async () => {
        target = await createTestTarget();
        await setKey(target, key);
        await clickActivateButton(target);
      });
      // Assert
      expect(Axios.put).toHaveBeenCalledWith(expect.stringContaining('profiles/activations'), expect.objectContaining({ key }));
    });

    it('notifies the user that activation was successful.', async () => {
      // Arrange
      let target: RenderResult;
      const key = v4();
      // Act
      await act(async () => {
        target = await createTestTarget();
        await setKey(target, key);
        await clickActivateButton(target);
      });
      const actual = alerts.list[0];
      // Assert
      expect(actual.severity).toEqual(ZAlertSeverity.Success);
    });

    it('notifies the user when activation fails.', async () => {
      // Arrange
      let target: RenderResult;
      const key = v4();
      Axios.put = jest.fn().mockRejectedValue('failed');
      // Act
      await act(async () => {
        target = await createTestTarget();
        await setKey(target, key);
        await clickActivateButton(target);
      });
      const actual = alerts.list[0];
      // Assert
      expect(actual.severity).toEqual(ZAlertSeverity.Error);
    });
  });

  describe('Activated', () => {
    beforeEach(() => {
      profile = new ZProfileBuilder().active().email('gambit@marvel.com').display('Gambit').build();
      state = new ZLoginStateStatic(profile);
    });

    it('shows the profile editor.', async () => {
      // Arrange
      let target: RenderResult;
      // Act
      await act(async () => {
        target = await createTestTarget();
      });
      const actual = target.getByTestId('ZProfileForm-root');
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
