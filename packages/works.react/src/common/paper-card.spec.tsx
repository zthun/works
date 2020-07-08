import { render } from '@testing-library/react';
import React from 'react';
import { ZPaperCard } from './paper-card';

describe('ZPaperCard', () => {
  let loading: boolean;

  async function createTestTarget() {
    return render(<ZPaperCard headerText='Paper Card Test' loading={loading} />);
  }

  beforeEach(() => {
    loading = false;
  });

  it('renders the component.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByText('Paper Card Test');
    // Assert
    expect(actual).toBeTruthy();
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
});
