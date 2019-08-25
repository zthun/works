
import { shallow } from 'enzyme';
import React from 'react';
import { ZForgotPasswordPage } from './forgot-password-page';

describe('ZForgotPasswordPage', () => {
  function createTestTarget() {
    return shallow(<ZForgotPasswordPage />);
  }

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.find('.ZForgotPasswordPage-root');
    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
