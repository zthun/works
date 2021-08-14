/* eslint-disable require-jsdoc */
import { act, fireEvent, render } from '@testing-library/react';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZHttpServiceContext } from '@zthun/works.react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ZLearnPage } from './learn-page';

describe('ZLearnPage', () => {
  let history: MemoryHistory;
  let markdown: string;
  let http: ZHttpServiceMock;

  function createTestTarget() {
    return render(
      <ZHttpServiceContext.Provider value={http}>
        <Router history={history}>
          <Route path='/learn/:pkg' component={ZLearnPage} />
        </Router>
      </ZHttpServiceContext.Provider>
    );
  }

  beforeEach(() => {
    markdown = '# README';
    history = createMemoryHistory({ initialEntries: ['/learn/works.core'] });

    http = new ZHttpServiceMock();
    http.set('docs/works.core.README.md', ZHttpMethod.Get, new ZHttpResultBuilder().data(markdown).build());
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
