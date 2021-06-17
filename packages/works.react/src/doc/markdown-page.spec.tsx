/* eslint-disable require-jsdoc */
import { act, render } from '@testing-library/react';
import React from 'react';
import { ZMarkdownPage } from './markdown-page';
import Axios from 'axios';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

jest.mock('axios');

describe('ZMarkdownPage', () => {
  let markdown: string;

  async function createTestTarget() {
    const target = render(<ZMarkdownPage src='markdown.md' headerText='Markdown' />);
    await act(async () => of(undefined).pipe(delay(2)).toPromise());
    return target;
  }

  beforeEach(() => {
    markdown = '# Markdown';
    (Axios.get as jest.Mock).mockResolvedValue({ data: markdown });
  });

  afterEach(() => {
    (Axios.get as jest.Mock).mockClear();
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
