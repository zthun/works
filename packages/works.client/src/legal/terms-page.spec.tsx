/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZTermsPage } from './terms-page';

describe('ZTermsPage', () => {
  function createTestTarget() {
    return render(<ZTermsPage />);
  }

  it('renders the page.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZTermsPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
