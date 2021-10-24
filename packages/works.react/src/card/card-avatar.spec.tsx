/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { ZCardAvatar } from './card-avatar';

describe('ZCardAvatar', () => {
  let src: string;

  async function createTestTarget() {
    const target = render(<ZCardAvatar src={src} size='md' />);
    await waitFor(() => expect(target.container.querySelector('.ZCardAvatar-root')).not.toBeNull());
    return target;
  }

  beforeEach(() => {
    src = new ZUrlBuilder().gravatar().build();
  });

  it('should render the component.', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
