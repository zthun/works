/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZChoicePage } from './choice-page';

describe('ZSelectPage', () => {
  async function createTestTarget() {
    const target = render(<ZChoicePage />);

    await waitFor(() => expect(target.container.querySelector('.ZChoicePage-root')).toBeTruthy());
    return target;
  }

  it('should render the page.', async () => {
    // Arrange
    // Act
    const target = await createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
