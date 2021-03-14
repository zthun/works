/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import React from 'react';
import { ZCircularBackdrop } from './circular-backdrop';

describe('ZCircularBackdrop', () => {
  let show: boolean;

  async function createTestTarget() {
    return render(<ZCircularBackdrop show={show} data-testid='ZCircularBackdrop-test' />);
  }

  beforeEach(() => {
    show = true;
  });

  it('should render if show is true.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZCircularBackdrop-test');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should not render if show is false.', async () => {
    // Arrange
    show = false;
    const target = await createTestTarget();
    // Assert
    const actual = target.queryByTestId('ZCircularBackdrop-test');
    // Assert
    expect(actual).toBeFalsy();
  });
});
