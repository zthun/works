/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZGettingStartedPage } from './getting-started-page';

describe('ZGettingStartedPage', () => {
  async function createTestTarget() {
    const target = render(<ZGettingStartedPage />);

    await waitFor(() => expect(target.container.querySelector('.ZGettingStartedPage-root')).toBeTruthy());
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
