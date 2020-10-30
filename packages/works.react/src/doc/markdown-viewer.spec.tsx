/* eslint-disable require-jsdoc */

import { render } from '@testing-library/react';
import Axios from 'axios';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ZMarkdownViewer } from './markdown-viewer';

jest.mock('axios');

describe('ZMarkdownViewer', () => {
  let url: string;
  let markdown: string;

  async function createTestTarget() {
    const target = render(<ZMarkdownViewer src={url} headerText='Test Markdown' />);
    await act(async (): Promise<undefined> => await of(undefined).pipe(delay(5)).toPromise());
    return target;
  }

  beforeEach(() => {
    markdown = `# Test
    _This is test markdown_
    `;

    (Axios.get as jest.Mock).mockClear();
    (Axios.get as jest.Mock).mockResolvedValue({ data: markdown });
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
    (Axios.get as jest.Mock).mockClear();
    (Axios.get as jest.Mock).mockRejectedValue(error);
    const target = await createTestTarget();
    // Act
    const actual = target.getByTestId('ZMarkdownViewer-root').innerHTML;
    // Assert
    expect(actual).toContain(error);
  });
});
