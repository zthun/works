/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { ZTestRouter } from '@zthun/works.react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { ZWebAppsPage } from './web-apps-page';

describe('ZWebAppsPage', () => {
  async function createTestTarget() {
    const history = createMemoryHistory();
    const target = render(
      <ZTestRouter location={history.location} navigator={history}>
        <ZWebAppsPage />
      </ZTestRouter>
    );

    await waitFor(() => expect(target.container.querySelector('.ZWebAppsPage-root')).toBeTruthy());
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
