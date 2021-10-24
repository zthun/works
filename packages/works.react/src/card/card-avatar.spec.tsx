/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { ZCardAvatar } from './card-avatar';

describe('ZCardAvatar', () => {
  let src: string;
  let size: 'auto' | 'max' | 'xl' | 'lg' | 'md' | 'sm';

  async function createTestTarget() {
    const target = render(<ZCardAvatar src={src} size={size} />);
    await waitFor(() => expect(target.container.querySelector('.ZCardAvatar-root')).not.toBeNull());
    return target;
  }

  beforeEach(() => {
    src = new ZUrlBuilder().gravatar().build();
    size = undefined;
  });

  it('should render the component.', async () => {
    // Arrange
    // Act
    const target = await createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });

  it('should render the component with the appropriate size.', async () => {
    // Arrange
    size = 'xl';
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector(`.ZCardAvatar-${size}`);
    // Assert
    expect(actual).not.toBeNull();
  });
});
