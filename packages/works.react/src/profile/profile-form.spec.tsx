import { fireEvent, render, RenderResult } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { ZProfileForm } from './profile-form';

describe('ZProfileForm', () => {
  let onProfileChange: jest.Mock;
  let hideAccountInformation: boolean;
  let hidePassword: boolean;
  let disabled: boolean;
  let loading: boolean;
  let profile: IZProfile;

  async function createTestTarget() {
    return render(<ZProfileForm profile={profile} onProfileChange={onProfileChange} loading={loading} disabled={disabled} hideAccountInformation={hideAccountInformation} hidePassword={hidePassword} />);
  }

  function getField(rend: RenderResult, id: string) {
    const input = rend.getByTestId(id).getElementsByTagName('input').item(0);
    return input;
  }

  function setField(rend: RenderResult, id: string, val: string) {
    const input = getField(rend, id);
    input.value = val;
    fireEvent.input(input);
  }

  function clickAction(rend: RenderResult) {
    const action = rend.getByTestId('ZProfileForm-btn-action') as HTMLButtonElement;
    fireEvent.click(action);
  }

  beforeEach(() => {
    hideAccountInformation = false;
    hidePassword = false;
    loading = false;
    disabled = false;
    profile = new ZProfileBuilder().email('gambit@marvel.com').build();
    onProfileChange = jest.fn();
  });

  describe('Loading', () => {
    it('should not show the spinner if the loading flag is false.', async () => {
      // Arrange
      loading = false;
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZProfileForm-progress-loading');
      // Assert
      expect(actual).toBeFalsy();
    });

    it('should show the spinner if the loading flag is true.', async () => {
      // Arrange
      loading = true;
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileForm-progress-loading');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      disabled = true;
    });

    async function assertDisablesField(id: string) {
      // Arrange
      const target = await createTestTarget();
      // Act
      const input = getField(target, id);
      // Assert
      expect(input.disabled).toBeTruthy();
    }

    it('should disable the display field.', async () => {
      await assertDisablesField('ZProfileForm-input-display');
    });

    it('should disable the email field.', async () => {
      await assertDisablesField('ZProfileForm-input-email');
    });

    it('should disable the password field.', async () => {
      await assertDisablesField('ZProfileForm-input-password');
    });

    it('should disable the confirm field.', async () => {
      await assertDisablesField('ZProfileForm-input-confirm');
    });

    it('should disable the action button.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZProfileForm-btn-action') as HTMLButtonElement;
      // Assert
      expect(btn.disabled).toBeTruthy();
    });
  });

  describe('Visibility', () => {
    async function assertFieldHidden(id: string) {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId(id);
      // Assert
      expect(actual).toBeFalsy();
    }

    describe('Account Information', () => {
      beforeEach(() => {
        hideAccountInformation = true;
      });

      it('should hide the display if hideAccountInformation is true.', async () => {
        await assertFieldHidden('ZProfileForm-input-display');
      });

      it('should hide the email if hideAccountInformation is true.', async () => {
        await assertFieldHidden('ZProfileForm-input-email');
      });
    });

    describe('Password', () => {
      beforeEach(() => {
        hidePassword = true;
      });

      it('should hide the password field if hidePassword is true.', async () => {
        await assertFieldHidden('ZProfileForm-input-password');
      });

      it('should hide the confirm field if hidePassword is true.', async () => {
        await assertFieldHidden('ZProfileForm-input-confirm');
      });
    });
  });

  describe('Avatar', () => {
    it('should show the user avatar if the user is not the super user.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileForm-icon-user');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should show the super user avatar if the user is the super user.', async () => {
      // Arrange
      profile = new ZProfileBuilder().copy(profile).super().build();
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZProfileForm-icon-superuser');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Action', () => {
    it('should fire the profileChange method with the updated profile.', async () => {
      // Arrange
      const target = await createTestTarget();
      const expected = new ZProfileBuilder().display('Wolverine').email('wolverine@marvel.com').password('sucks-password').confirm('sucks-password').build();
      // Act
      await act(async () => {
        setField(target, 'ZProfileForm-input-display', expected.display);
        setField(target, 'ZProfileForm-input-email', expected.email);
        setField(target, 'ZProfileForm-input-password', expected.password);
        setField(target, 'ZProfileForm-input-confirm', expected.confirm);
      });
      clickAction(target);
      // Assert
      expect(onProfileChange).toHaveBeenCalledWith(expected);
    });
  });
});
