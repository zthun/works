/* eslint-disable require-jsdoc */
import { fireEvent, render, act } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ZLearnPage } from './learn-page';

describe('ZLearnPage', () => {
  let history: MemoryHistory;

  function createTestTarget() {
    return render(
      <Router history={history}>
        <Route path='/learn/:pkg' component={ZLearnPage} />
      </Router>
    );
  }

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/learn/works.core'] });
  });

  it('renders the page', async () => {
    // Arrange
    let actual: HTMLElement = null;
    // Act
    await act(async () => {
      const target = createTestTarget();
      actual = target.queryByTestId('ZLearnPage-root');
    });
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should navigate to the api page when the api button is clicked.', async () => {
    // Arrange
    // Act
    await act(async () => {
      const target = createTestTarget();
      const api = await target.findByTestId('ZLearnPage-btn-api');
      fireEvent.click(api);
    });
    const actual = history.location.pathname;
    // Assert
    expect(actual).toEqual('/api/works.core');
  });
});
