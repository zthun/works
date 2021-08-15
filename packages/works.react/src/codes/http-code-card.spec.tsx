/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import { ZHttpCodeClient } from '@zthun/works.http';
import React from 'react';
import { ZHttpStatusCodeCard } from './http-code-card';

describe('ZHttpStatusCodeCard', () => {
  let code: number;

  function createTestTarget() {
    return render(<ZHttpStatusCodeCard code={code} />);
  }

  beforeEach(() => {
    code = ZHttpCodeClient.NotFound;
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
    code = ZHttpCodeClient.ImATeapot;
    const target = createTestTarget();
    // Act
    const actual = target.getByTestId('ZHttpStatusCodeCard-teapot');
    // Assert
    expect(actual).toBeTruthy();
  });
});
