import { act, render, RenderResult } from '@testing-library/react';
import { ZLoginState, ZLoginStateContext } from '@zthun/auth.react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ZProfilePage } from './profile-page';

describe('ZProfilePage', () => {
  it('renders the page', async () => {
    // Arrange
    let target: RenderResult;
    // Act
    await act(async () => {
      // Arrange
      target = render(
        <ZLoginStateContext.Provider value={new ZLoginState(() => Promise.resolve(true))}>
          <MemoryRouter>
            <ZProfilePage />
          </MemoryRouter>
        </ZLoginStateContext.Provider>
      );
    });
    // Act
    const actual = target.queryByTestId('ZProfilePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
