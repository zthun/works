/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { ZTopNavAvatar } from './top-nav-avatar';

describe('ZTopNavAvatar', () => {
  let src: string;

  async function createTestTarget() {
    const target = render(<ZTopNavAvatar src={src} />);
    await waitFor(() => expect(target.getByTestId('ZTopNavAvatar-root')).not.toBeNull());
    return target;
  }

  beforeEach(() => {
    src = new ZUrlBuilder().gravatar().build();
  });

  it('should render the avatar.', async () => {
    // Arrange
    // Act
    const target = await createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
