/* eslint-disable require-jsdoc */
import { fireEvent, render } from '@testing-library/react';
import { identity } from 'lodash';
import React from 'react';
import { ZthunworksFooter } from './works-footer';

describe('ZthunworksMenu', () => {
  async function createTestTarget() {
    return render(<ZthunworksFooter />);
  }

  it('renders the footer', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZthunworksFooter-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('SourceCodeHome', () => {
    beforeEach(() => {
      jest.spyOn(window, 'open').mockImplementation(identity.bind(null, window));
    });

    afterEach(() => {
      (window.open as jest.Mock).mockClear();
    });

    it('navigates to a target _blank github.', async () => {
      // Arrange
      const target = await createTestTarget();
      spyOn(window, 'open');
      // Act
      const btn = target.getByTestId('ZthunworksFooter-btn-github');
      fireEvent.click(btn);
      // Assert
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining('github.com'), '_blank');
    });
  });
});
