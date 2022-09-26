/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZButtonPage } from './button-page';

describe('ZButtonPage', () => {
  async function createTestTarget() {
    const target = render(<ZButtonPage />);

    await waitFor(() => expect(target.container.querySelector('.ZButtonPage-root')).toBeTruthy());
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
