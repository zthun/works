import { render } from '@testing-library/react';
import React from 'react';
import { ZAuthApp } from './auth-app';

describe('ZAuthApp', () => {
  it('renders the application', () => {
    // Arrange
    const target = render(<ZAuthApp />);
    // Act
    const actual = target.queryByTestId('ZAuthApp-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
