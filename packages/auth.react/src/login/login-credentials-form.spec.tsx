import { fireEvent, render, RenderResult } from '@testing-library/react';
import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';
import React from 'react';
import { ZLoginCredentialsForm } from './login-credentials-form';

describe('ZLoginCredentialsForm', () => {
  function getElement<T extends HTMLElement>(id: string, target: RenderResult): T {
    const found = target.queryByTestId(id);
    return found as T;
  }

  function getField<T extends HTMLElement>(tag: string, id: string, target: RenderResult): T {
    const found = getElement<HTMLElement>(id, target);

    if (found == null) {
      return null;
    }

    if (found.tagName.toLowerCase() === tag.toLowerCase()) {
      return found as T;
    }

    const inner = found.getElementsByTagName(tag);
    return inner.length > 0 ? (inner.item(0) as T) : null;
  }

  const getInputField: (id: string, target: RenderResult) => HTMLInputElement = getField.bind(null, 'input');
  const getButtonField: (id: string, target: RenderResult) => HTMLButtonElement = getField.bind(null, 'button');
  const getEmailField: (target: RenderResult) => HTMLInputElement = getInputField.bind(null, 'ZLoginCredentialsForm-input-email');
  const getPasswordField: (target: RenderResult) => HTMLInputElement = getInputField.bind(null, 'ZLoginCredentialsForm-input-password');
  const getConfirmField: (target: RenderResult) => HTMLInputElement = getInputField.bind(null, 'ZLoginCredentialsForm-input-confirm');
  const getActionButton: (target: RenderResult) => HTMLButtonElement = getButtonField.bind(null, 'ZLoginCredentialsForm-btn-action');
  const getLoadingIcon: (target: RenderResult) => HTMLSpanElement = getElement.bind(null, 'ZLoginCredentialsForm-icon-progress');

  it('renders the default form.', () => {
    // Arrange
    // Act
    const target = render(<ZLoginCredentialsForm />);
    const actual = target.getByTestId('ZLoginCredentialsForm-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Credentials', () => {
    let credentials: IZLogin;

    beforeEach(() => {
      credentials = new ZLoginBuilder().email('test@zthunworks.com').password('not-very-secure').confirm('does-not-match').build();
    });

    it('defaults the email field to the empty string.', () => {
      // Arrange
      // Act
      const target = render(<ZLoginCredentialsForm />);
      const actual = getEmailField(target);
      // Assert
      expect(actual.value).toEqual('');
    });

    it('initializes the email field.', () => {
      // Arrange
      // Act
      const target = render(<ZLoginCredentialsForm credentials={credentials} />);
      const actual = getEmailField(target);
      // Assert
      expect(actual.value).toEqual(credentials.email);
    });

    it('defaults the password field to the empty string.', () => {
      // Arrange
      // Act
      const target = render(<ZLoginCredentialsForm />);
      const actual = getPasswordField(target);
      // Assert
      expect(actual.value).toEqual('');
    });

    it('initializes the password field.', () => {
      // Arrange
      // Act
      const target = render(<ZLoginCredentialsForm credentials={credentials} />);
      const actual = getPasswordField(target);
      // Assert
      expect(actual.value).toEqual(credentials.password);
    });

    it('defaults the confirm field to the empty string.', () => {
      // Arrange
      // Act
      const target = render(<ZLoginCredentialsForm />);
      const actual = getConfirmField(target);
      // Assert
      expect(actual.value).toEqual('');
    });

    it('initializes the confirm field.', () => {
      // Arrange
      // Act
      const target = render(<ZLoginCredentialsForm credentials={credentials} />);
      const actual = getConfirmField(target);
      // Assert
      expect(actual.value).toEqual(credentials.confirm);
    });

    it('raises the credentialsChange event when the action button is clicked.', () => {
      // Arrange
      const expected = jest.fn();
      const target = render(<ZLoginCredentialsForm onCredentialsChange={expected} />);
      const actionButton = getActionButton(target);
      const emailField = getEmailField(target);
      const passwordField = getPasswordField(target);
      const confirmField = getConfirmField(target);
      emailField.value = credentials.email;
      fireEvent.blur(emailField, { target: emailField });
      passwordField.value = credentials.password;
      fireEvent.blur(passwordField, { target: passwordField });
      confirmField.value = credentials.confirm;
      fireEvent.blur(confirmField, { target: confirmField });
      // Act
      fireEvent.click(actionButton);
      // Assert
      expect(expected).toHaveBeenCalledWith(expect.objectContaining(credentials));
    });

    it('auto confirms the password when the action button is clicked if the hideConfirm flag is true.', () => {
      // Arrange
      const expected = jest.fn();
      const target = render(<ZLoginCredentialsForm hideConfirm={true} onCredentialsChange={expected} />);
      const confirmed = new ZLoginBuilder().copy(credentials).autoConfirm().build();
      const actionButton = getActionButton(target);
      const emailField = getEmailField(target);
      const passwordField = getPasswordField(target);
      emailField.value = credentials.email;
      fireEvent.blur(emailField, { target: emailField });
      passwordField.value = credentials.password;
      fireEvent.blur(passwordField, { target: passwordField });
      // Act
      fireEvent.click(actionButton);
      // Assert
      expect(expected).toHaveBeenCalledWith(expect.objectContaining(confirmed));
    });
  });

  describe('Options', () => {
    it('does not show the email field if the hideEmail is true.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm hideEmail={true} />);
      // Act
      const actual = getEmailField(target);
      // Assert
      expect(actual).toBeNull();
    });

    it('does not show the password field if the hidePassword field is true.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm hidePassword={true} />);
      // Act
      const actual = getPasswordField(target);
      // Assert
      expect(actual).toBeNull();
    });

    it('does not show the confirm field if the hideConfirm field is true.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm hideConfirm={true} />);
      // Act
      const actual = getConfirmField(target);
      // Assert
      expect(actual).toBeNull();
    });

    it('disables the action button if the form is disabled.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm disabled={true} />);
      // Act
      const actual = getActionButton(target);
      // Assert
      expect(actual.disabled).toBeTruthy();
    });

    it('disables the email field if the form is disabled.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm disabled={true} />);
      // Act
      const actual = getEmailField(target);
      // Assert
      expect(actual.disabled).toBeTruthy();
    });

    it('disables the password field if the form is disabled.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm disabled={true} />);
      // Act
      const actual = getPasswordField(target);
      // Assert
      expect(actual.disabled).toBeTruthy();
    });

    it('disables the confirm field if the form is disabled.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm disabled={true} />);
      // Act
      const actual = getConfirmField(target);
      // Assert
      expect(actual.disabled).toBeTruthy();
    });

    it('hides the loading icon if the loading flag is false.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm loading={false} />);
      // Act
      const actual = getLoadingIcon(target);
      // Assert
      expect(actual).toBeFalsy();
    });

    it('shows the loading icon if the loading flag is true.', () => {
      // Arrange
      const target = render(<ZLoginCredentialsForm loading={true} />);
      // Act
      const actual = getLoadingIcon(target);
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
