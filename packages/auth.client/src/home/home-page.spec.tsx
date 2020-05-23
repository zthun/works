import { render } from '@testing-library/react';
import React from 'react';
import { ZHomePage } from './home-page';

describe('ZHomePage', () => {
  it('renders the page', () => {
    // Arrange
    const target = render(<ZHomePage />);
    // Act
    const actual = target.queryByTestId('ZHomePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
