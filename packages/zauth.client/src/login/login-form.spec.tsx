import { render } from '@testing-library/react';
import React from 'react';
import { ZLoginForm } from './login-form';

describe('ZLoginForm', () => {
  function createTestTarget() {
    return render(<ZLoginForm forgotPasswordRoute='f-p' createAccountRoute='c-a' />);
  }

  describe('Existing user', () => {
    it('renders the form.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.getByTestId('ZLoginForm-existing-user');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('New user', () => {
    it('renders the form.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.getByTestId('ZLoginForm-new-user');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Forgot password', () => {
    it('renders the form.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.getByTestId('ZLoginForm-forgot-password');
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
