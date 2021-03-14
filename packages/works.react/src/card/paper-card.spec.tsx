/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import React from 'react';
import { ZPaperCard } from './paper-card';

describe('ZPaperCard', () => {
  let loading: boolean;
  let disabled: boolean;
  let media: string;
  let actionText: string;

  async function createTestTarget() {
    return render(<ZPaperCard headerText='Paper Card Test' disabled={disabled} loading={loading} imageUrl={media} actionText={actionText} />);
  }

  beforeEach(() => {
    loading = false;
    media = null;
    actionText = null;
  });

  it('renders the component.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByText('Paper Card Test');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Disabled', () => {
    it('disables the action button if displayed.', async () => {
      // Arrange
      actionText = 'Action';
      disabled = true;
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZPaperCard-btn-action') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Loading', () => {
    it('shows the loading indicator if the component is loading.', async () => {
      // Arrange
      loading = true;
      const target = await createTestTarget();
      // Act
      const actual = target.getByTestId('ZPaperCard-progress-loading');
      // Assert
      expect(actual).toBeTruthy();
    });

    it('does not show the loading indicator if the component is not loading.', async () => {
      // Arrange
      loading = false;
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZPaperCard-progress-loading');
      // Assert
      expect(actual).toBeFalsy();
    });
  });

  describe('Media', () => {
    it('hides the media component if the imageUrl is not set.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZPaperCard-media');
      // Assert
      expect(actual).toBeFalsy();
    });

    it('displays the media component if the imageUrl is set.', async () => {
      // Arrange
      media = 'images/svg/works.svg';
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZPaperCard-media');
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe('Footer', () => {
    it('hides the card actions component if action text is not set.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZPaperCard-btn-action');
      // Assert
      expect(actual).toBeFalsy();
    });

    it('shows the card actions component if action text is set.', async () => {
      // Arrange
      actionText = 'Run it!';
      const target = await createTestTarget();
      // Act
      const actual = target.queryByTestId('ZPaperCard-btn-action');
      // Assert
      expect(actual).toBeTruthy();
    });
  });
});
