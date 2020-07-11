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
  let profile: IZProfile;

  async function createTestTarget() {
    return render(<ZProfileForm profile={profile} onProfileChange={onProfileChange} disabled={disabled} hideAccountInformation={hideAccountInformation} hidePassword={hidePassword} />);
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
    const action = rend.getByTestId('ZActionForm-form');
    fireEvent.submit(action);
  }

  beforeEach(() => {
    hideAccountInformation = false;
    hidePassword = false;
    disabled = false;
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').build();
    onProfileChange = jest.fn();
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

  describe('Save', () => {
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

    it('should fire the profileChange method with a null display name if the display is empty.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      await act(async () => {
        setField(target, 'ZProfileForm-input-display', '');
      });
      clickAction(target);
      // Assert
      expect(onProfileChange).toHaveBeenCalledWith(expect.objectContaining({ display: null }));
    });

    it('should fire the profileChange method without the password or confirm password fields if the password and confirm password fields are empty.', async () => {
      // Arrange
      const target = await createTestTarget();
      const expected = new ZProfileBuilder().password('not-very-secure').autoConfirm().build();
      // Act
      await act(async () => {
        setField(target, 'ZProfileForm-input-password', expected.password);
        setField(target, 'ZProfileForm-input-confirm', expected.confirm);
      });
      clickAction(target);
      // Assert
      expect(onProfileChange).toHaveBeenCalledWith(expect.objectContaining({ password: expected.password, confirm: expected.confirm }));
    });

    it('should fire the profileChange method with the password and confirm fields set if the password is not empty.', async () => {
      // Arrange
      const target = await createTestTarget();
      const password = 'not-very-secure';
      // Act
      await act(async () => {
        setField(target, 'ZProfileForm-input-password', password);
        setField(target, 'ZProfileForm-input-confirm', '');
      });
      clickAction(target);
      // Assert
      expect(onProfileChange).toHaveBeenCalledWith(expect.objectContaining({ password, confirm: '' }));
    });

    it('should fire the profileChange method with the password and confirm fields set if the confirm is not empty.', async () => {
      // Arrange
      const target = await createTestTarget();
      const password = 'not-very-secure';
      // Act
      await act(async () => {
        setField(target, 'ZProfileForm-input-password', '');
        setField(target, 'ZProfileForm-input-confirm', password);
      });
      clickAction(target);
      // Assert
      expect(onProfileChange).toHaveBeenCalledWith(expect.objectContaining({ password: '', confirm: password }));
    });
    it('should file the profileChange method with an empty email if the email has not changed.', async () => {
      // Arrange
      const target = await createTestTarget();
      const expected = new ZProfileBuilder().display(profile.display).build();
      // Act
      await act(async () => {
        setField(target, 'ZProfileForm-input-display', expected.display);
        setField(target, 'ZProfileForm-input-email', profile.email);
      });
      clickAction(target);
      // Assert
      expect(onProfileChange).toHaveBeenCalledWith(expected);
    });
  });
});
