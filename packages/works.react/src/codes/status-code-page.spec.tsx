/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZStatusCodePage } from './status-code-page';

describe('ZStatusCodePage', () => {
  let code: number;

  function createTestTarget() {
    return render(<ZStatusCodePage code={code} />);
  }

  beforeEach(() => {
    code = 404;
  });

  it('should render the page.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZStatusCodePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
