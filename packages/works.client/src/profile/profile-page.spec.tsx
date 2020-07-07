import { act, render, RenderResult } from '@testing-library/react';
import { ZLoginState, ZLoginStateContext } from '@zthun/works.react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ZProfilePage } from './profile-page';

describe('ZProfilePage', () => {
  async function createTestTarget() {
    return render(
      <ZLoginStateContext.Provider value={new ZLoginState(() => Promise.resolve(undefined))}>
        <MemoryRouter>
          <ZProfilePage />
        </MemoryRouter>
      </ZLoginStateContext.Provider>
    );
  }
  it('renders the page', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZProfilePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
