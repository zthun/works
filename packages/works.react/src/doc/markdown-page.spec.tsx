/* eslint-disable require-jsdoc */
import { act, render } from '@testing-library/react';
import { ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import React from 'react';
import { lastValueFrom, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ZHttpServiceContext } from '../http/http-service.context';
import { renderMarkdownPage } from './markdown-page';

describe('ZMarkdownPage', () => {
  let markdown: string;
  let http: ZHttpServiceMock;

  async function createTestTarget() {
    const target = render(<ZHttpServiceContext.Provider value={http}>{renderMarkdownPage({ src: 'markdown.md', headerText: 'Test Markdown' })}</ZHttpServiceContext.Provider>);
    await act(async () => lastValueFrom(of(undefined).pipe(delay(2))));
    return target;
  }

  beforeEach(() => {
    markdown = '# Markdown';

    http = new ZHttpServiceMock();
    http.set('markdown.md', ZHttpMethod.Get, new ZHttpResultBuilder().data(markdown).build());
  });

  it('renders the page.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZMarkdownPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
