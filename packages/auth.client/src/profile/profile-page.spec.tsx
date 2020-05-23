import { render } from '@testing-library/react';
import React from 'react';
import { ZProfilePage } from './profile-page';

describe('ZAuthApp', () => {
  it('renders the page', () => {
    // Arrange
    const target = render(<ZProfilePage />);
    // Act
    const actual = target.queryByTestId('ZProfilePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
