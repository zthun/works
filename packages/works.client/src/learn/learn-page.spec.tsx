/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ZLearnPage } from './learn-page';

describe('ZHomePage', () => {
  let history: MemoryHistory;

  function createTestTarget() {
    return render(
      <Router history={history}>
        <ZLearnPage />
      </Router>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.queryByTestId('ZLearnPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
