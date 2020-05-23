import { render } from '@testing-library/react';
import React from 'react';
import { ZAuthMenu } from './auth-menu';

describe('ZAuthApp', () => {
  it('renders the menu', () => {
    // Arrange
    const target = render(<ZAuthMenu />);
    // Act
    const actual = target.queryByTestId('ZAuthMenu-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
