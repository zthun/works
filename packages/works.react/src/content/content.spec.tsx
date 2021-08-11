/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZContent } from './content';

describe('ZContent', () => {
  function createTestTarget() {
    return render(
      <ZContent>
        <div data-testid='Test-content' />
      </ZContent>
    );
  }

  it('should render the content.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('Test-content');
    // Assert
    expect(actual).toBeTruthy();
  });
});
