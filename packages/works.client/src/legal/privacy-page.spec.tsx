/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZPrivacyPage } from './privacy-page';

describe('ZPrivacyPage', () => {
  function createTestTarget() {
    return render(<ZPrivacyPage />);
  }

  it('renders the page.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZPrivacyPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
