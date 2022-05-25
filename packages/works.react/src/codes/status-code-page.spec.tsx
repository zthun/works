/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { ZRoute, ZRouteMap, ZTestRouter } from '../router/router-dom';
import { ZStatusCodePage } from './status-code-page';

describe('ZStatusCodePage', () => {
  let code: number;

  async function createTestTarget() {
    const history = createMemoryHistory({ initialEntries: [`/${code}`] });

    const target = render(
      <ZTestRouter location={history.location} navigator={history}>
        <ZRouteMap>
          <ZRoute path='/:code' element={<ZStatusCodePage name='code' />} />
        </ZRouteMap>
      </ZTestRouter>
    );

    await waitFor(() => expect(target.container.querySelector('.ZStatusCodePage-root')).toBeTruthy());

    return target;
  }

  beforeEach(() => {
    code = 404;
  });

  it('should render the page.', async () => {
    // Arrange
    // Act
    const target = await createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
