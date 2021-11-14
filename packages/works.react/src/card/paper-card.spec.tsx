/* eslint-disable require-jsdoc */

import { act, fireEvent, render } from '@testing-library/react';
import { ZDataUrlBuilder, ZMimeTypeImage } from '@zthun/works.url';
import React from 'react';
import { ZPaperCard } from './paper-card';

describe('ZPaperCard', () => {
  let loading: boolean;
  let disabled: boolean;
  let media: string;
  let actionText: string;
  let confirmation: string;
  let autoConfirm: boolean;

  async function createTestTarget() {
    return render(<ZPaperCard headerText='Paper Card Test' disabled={disabled} loading={loading} imageUrl={media} actionText={actionText} confirmation={confirmation} autoConfirm={autoConfirm} />);
  }

  beforeEach(() => {
    loading = false;
    media = null;
    actionText = null;
    confirmation = null;
    disabled = false;
    autoConfirm = false;
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
    beforeEach(() => {
      actionText = 'Action';
    });

    it('enables the action button if the disabled flag is false and the card requires no confirmation.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZPaperCard-btn-action') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeFalsy();
    });

    it('enables the action button if the disabled flag is false and the card is confirmed.', async () => {
      // Arrange
      const confirm = 'Confirm';
      confirmation = confirm;
      const target = await createTestTarget();
      // Act
      await act(async () => {
        const chk = target.getByText(confirm);
        fireEvent.click(chk);
      });
      const btn = target.getByTestId('ZPaperCard-btn-action') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeFalsy();
    });

    it('disables the action button if the disabled flag is true.', async () => {
      // Arrange
      disabled = true;
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZPaperCard-btn-action') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });

    it('disables the action button if the disabled flag is false, but the card is confirming and the confirmation has not been checked.', async () => {
      // Arrange
      const confirm = 'Confirm';
      confirmation = confirm;
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZPaperCard-btn-action') as HTMLInputElement;
      const actual = btn.disabled;
      // Assert
      expect(actual).toBeTruthy();
    });

    it('disables the action button if the card is confirmed but the disabled flag is true.', async () => {
      // Arrange
      const confirm = 'Confirm';
      confirmation = confirm;
      autoConfirm = true;
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

    it('displays the media component as a direct svg if the imageUrl is a data uri to an svg.', async () => {
      // Arrange
      const svg = '<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>';
      media = new ZDataUrlBuilder().encode('base64').buffer(svg).mimeType(ZMimeTypeImage.SVG).build();
      const target = await createTestTarget();
      // Act
      const actual = target.container.querySelector('.ZPaperCard-svg');
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
