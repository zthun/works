/* eslint-disable require-jsdoc */
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZHttpServiceContext, ZRoute, ZRouteMap, ZTestRouter } from '@zthun/works.react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { ZLearnPage } from './learn-page';

describe('ZLearnPage', () => {
  let history: MemoryHistory;
  let markdown: string;
  let http: ZHttpServiceMock;

  async function createTestTarget() {
    const target = render(
      <ZHttpServiceContext.Provider value={http}>
        <ZTestRouter location={history.location} navigator={history}>
          <ZRouteMap>
            <ZRoute path='/learn/:pkg' element={<ZLearnPage />} />
          </ZRouteMap>
        </ZTestRouter>
      </ZHttpServiceContext.Provider>
    );

    await waitFor(() => expect(target.container.querySelector('.ZLearnPage-root')).toBeTruthy());
    await waitFor(() => expect(target.container.querySelector('.ZCircularProgress-root')).toBeFalsy());
    return target;
  }

  async function clickGoToApiButton(target: RenderResult) {
    const btn = target.container.querySelector<HTMLButtonElement>('.ZPaperCard-btn-action');
    await act(async () => {
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
