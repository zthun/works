import { render } from '@testing-library/react';
import React from 'react';
import { ZLoginPage } from './login-page';

describe('ZLoginPage', () => {
  it('renders the page', () => {
    // Arrange
    const target = render(<ZLoginPage />);
    // Act
    const actual = target.queryByTestId('ZLoginPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
