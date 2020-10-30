/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZLegalPage } from './legal-page';

describe('ZLegalPage', () => {
  function createTestTarget() {
    return render(<ZLegalPage />);
  }

  it('renders the page.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZLegalPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
