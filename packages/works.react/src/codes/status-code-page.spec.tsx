/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ZStatusCodePage } from './status-code-page';

describe('ZStatusCodePage', () => {
  let code: number;

  async function createTestTarget() {
    const target = render(
      <MemoryRouter initialEntries={[`/${code}`]}>
        <Routes>
          <Route path='/:code' element={<ZStatusCodePage name='code' />} />
        </Routes>
      </MemoryRouter>
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
