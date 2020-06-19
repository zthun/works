import { render } from '@testing-library/react';
import React from 'react';
import { ZthunworksMenu } from './works-menu';

describe('ZthunworksMenu', () => {
  it('renders the menu', () => {
    // Arrange
    const target = render(<ZthunworksMenu />);
    // Act
    const actual = target.queryByTestId('ZthunworksMenu-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
