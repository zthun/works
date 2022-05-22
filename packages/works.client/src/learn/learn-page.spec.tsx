/* eslint-disable require-jsdoc */
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
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

  async function createTestTarget() {
    const target = render(
      <ZHttpServiceContext.Provider value={http}>
        <Router history={history}>
          <Route path='/learn/:pkg' component={ZLearnPage} />
        </Router>
      </ZHttpServiceContext.Provider>
    );

    await waitFor(() => expect(target.container.querySelector('.ZLearnPage-root')).toBeTruthy());
    return target;
  }

  async function clickGoToApiButton(target: RenderResult) {
    const btn = target.container.querySelector<HTMLButtonElement>('.ZPaperCard-btn-action');
    await act(() => {
      fireEvent.click(btn);
    });
  }

  beforeEach(() => {
    markdown = '# README';
    history = createMemoryHistory({ initialEntries: ['/learn/works.core'] });

    http = new ZHttpServiceMock();
    http.set('docs/works.core.README.md', ZHttpMethod.Get, new ZHttpResultBuilder().data(markdown).build());
  });

  it('should navigate to the api page when the api button is clicked.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    await clickGoToApiButton(target);
    const actual = history.location.pathname;
    // Assert
    expect(actual).toEqual('/learn/works.core/api');
  });
});
