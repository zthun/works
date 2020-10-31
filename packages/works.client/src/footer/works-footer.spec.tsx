/* eslint-disable require-jsdoc */
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { identity } from 'lodash';
import React from 'react';
import { Router } from 'react-router-dom';
import { ZthunworksFooter } from './works-footer';

describe('ZthunworksMenu', () => {
  let history: MemoryHistory;

  async function createTestTarget() {
    return render(
      <Router history={history}>
        <ZthunworksFooter />
      </Router>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory();
    jest.spyOn(window, 'open').mockImplementation(identity.bind(null, window));
  });

  afterEach(() => {
    (window.open as jest.Mock).mockClear();
  });

  it('renders the footer', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZthunworksFooter-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('SourceCodeHome', () => {
    it('navigates to a target _blank github.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZthunworksFooter-btn-github');
      fireEvent.click(btn);
      // Assert
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining('github.com'), '_blank');
    });
  });

  describe('Contact information', () => {
    it('navigates to a contact application.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZthunworksFooter-btn-contact');
      fireEvent.click(btn);
      // Assert
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining('mailto:'), '_blank');
    });
  });

  describe('Legal information', () => {
    it('navigates to privacy.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZthunworksFooter-btn-privacy');
      fireEvent.click(btn);
      // Assert
      expect(history.location.pathname).toEqual('/privacy');
    });

    it('navigates to the terms of use.', async () => {
      // Arrange
      const target = await createTestTarget();
      // Act
      const btn = target.getByTestId('ZthunworksFooter-btn-terms');
      fireEvent.click(btn);
      // Assert
      expect(history.location.pathname).toEqual('/terms');
    });
  });
});
