/* eslint-disable require-jsdoc */
import { fireEvent, render, act } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ZLearnPage } from './learn-page';
import Axios from 'axios';

jest.mock('axios');

describe('ZLearnPage', () => {
  let history: MemoryHistory;
  let markdown: string;

  function createTestTarget() {
    return render(
      <Router history={history}>
        <Route path='/learn/:pkg' component={ZLearnPage} />
      </Router>
    );
  }

  beforeEach(() => {
    markdown = '# README';
    history = createMemoryHistory({ initialEntries: ['/learn/works.core'] });
    (Axios.get as jest.Mock).mockResolvedValue(markdown);
  });

  afterEach(() => {
    (Axios.get as jest.Mock).mockClear();
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
      const api = await target.findByTestId('ZPaperCard-btn-action');
      fireEvent.click(api);
    });
    const actual = history.location.pathname;
    // Assert
    expect(actual).toEqual('/learn/works.core/api');
  });
});
