/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZAlertsPage } from './alerts-page';

describe('ZAlertsPage', () => {
  async function createTestTarget() {
    const target = render(<ZAlertsPage />);

    await waitFor(() => expect(target.container.querySelector('.ZAlertsPage-root')).toBeTruthy());
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
