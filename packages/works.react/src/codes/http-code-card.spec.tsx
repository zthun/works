import { render } from '@testing-library/react';
import React from 'react';
import { ZHttpStatusCodeCard } from './http-code-card';

describe('ZHttpStatusCodeCard', () => {
  let code: number;

  function createTestTarget() {
    return render(<ZHttpStatusCodeCard code={code} />);
  }

  beforeEach(() => {
    code = 404;
  });

  it('should render the component.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZHttpStatusCodeCard-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should be short and stout.', () => {
    // Arrange
    code = 418;
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZHttpStatusCodeCard-teapot');
    // Assert
    expect(actual).toBeTruthy();
  });
});
