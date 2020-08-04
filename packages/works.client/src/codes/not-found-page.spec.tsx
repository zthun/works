import { render } from '@testing-library/react';
import { ZNotFoundPage } from './not-found-page';
import React from 'react';

describe('ZNotFoundPage', () => {
  function createTestTarget() {
    return render(<ZNotFoundPage />);
  }

  it('should render the page.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZNotFoundPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
