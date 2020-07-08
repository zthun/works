import { render } from '@testing-library/react';
import React from 'react';
import { ZCircularProgress } from './circular-progress';

describe('ZCircularProgress', () => {
  let show: boolean;

  async function createTestTarget() {
    return render(<ZCircularProgress show={show} data-testid='ZCircularProgress-test' />);
  }

  beforeEach(() => {
    show = true;
  });

  it('should render if show is true.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZCircularProgress-test');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should not render if show is false.', async () => {
    // Arrange
    show = false;
    const target = await createTestTarget();
    // Assert
    const actual = target.queryByTestId('ZCircularProgress-test');
    // Assert
    expect(actual).toBeFalsy();
  });
});
