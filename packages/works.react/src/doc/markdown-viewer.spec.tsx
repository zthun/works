/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import { ZHttpCodeClient, ZHttpCodeSuccess, ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { lastValueFrom, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ZHttpServiceContext } from '../http/http-service.context';
import { ZMarkdownViewer } from './markdown-viewer';

describe('ZMarkdownViewer', () => {
  let url: string;
  let markdown: string;
  let http: ZHttpServiceMock;

  async function createTestTarget() {
    const target = render(
      <ZHttpServiceContext.Provider value={http}>
        <ZMarkdownViewer src={url} headerText='Test Markdown' />
      </ZHttpServiceContext.Provider>
    );
    await act(async (): Promise<undefined> => await lastValueFrom(of(undefined).pipe(delay(5))));
    return target;
  }

  beforeEach(() => {
    http = new ZHttpServiceMock();

    url = 'https://zthunworks.com/docs/README.md';

    markdown = `# Test
    _This is test markdown_
    `;

    const result = new ZHttpResultBuilder(markdown).status(ZHttpCodeSuccess.OK).build();
    http.set(url, ZHttpMethod.Get, () => result);
  });

  it('should render the markdown from the source.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZMarkdownViewer-root').innerHTML;
    // Assert
    expect(actual).toContain('<h1>Test</h1>');
  });

  it('should render an error markdown if an error occurs while retrieving the source.', async () => {
    // Arrange
    const error = 'An error occurred retrieving the markdown.';
    const result = new ZHttpResultBuilder(error).status(ZHttpCodeClient.Forbidden).build();
    http.set(url, ZHttpMethod.Get, result);
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZMarkdownViewer-root').innerHTML;
    // Assert
    expect(actual).toContain(error);
  });
});
