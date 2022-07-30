/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZButton } from '../buttons/button';
import { ZToolbar } from './toolbar';

describe('ZToolbar', () => {
  async function createTestTarget() {
    const target = render(
      <ZToolbar>
        <ZButton className='test-toolbar-button'>Toolbar Button</ZButton>
      </ZToolbar>
    );

    await waitFor(() => expect(target.container.querySelector('.ZToolbar-root')).toBeTruthy());

    return target;
  }

  it('should render the component.', async () => {
    // Arrange
    // Act
    const target = await createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
