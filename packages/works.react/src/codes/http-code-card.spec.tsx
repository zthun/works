import { render } from '@testing-library/react';
import React from 'react';
import { ZHttpCodeCard } from './http-code-card';

describe('ZNotFoundPage', () => {
  function createTestTarget() {
    return render(<ZHttpCodeCard code={401} />);
  }

  it('should render the component.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZHttpCodeCard-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
