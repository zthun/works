/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZBooleanPage } from './boolean-page';

describe('ZBooleanPage', () => {
  async function createTestTarget() {
    const target = render(<ZBooleanPage />);

    await waitFor(() => expect(target.container.querySelector('.ZBooleanPage-root')).toBeTruthy());
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
