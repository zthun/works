/* eslint-disable require-jsdoc */
import { act, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { delay, lastValueFrom, of } from 'rxjs';
import { renderPrivacyPage, renderStatusCodePage, renderTermsPage, ZthunworksApp } from './works-app';

describe('ZthunworksApp', () => {
  async function createTestTarget() {
    let target: RenderResult;

    await act(async () => {
      target = render(<ZthunworksApp />);
      await lastValueFrom(of(true).pipe(delay(0)));
    });

    return target;
  }
  it('renders the application', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.queryByTestId('Zthunworks-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  describe('Render', () => {
    function assertRendersPage<T = any>(renderFn: (p?: RouteComponentProps<T>) => JSX.Element, p?: RouteComponentProps<T>) {
      // Arrange
      // Act
      const target = renderFn(p);
      // Assert
      expect(target).toBeTruthy();
    }

    it('should return the terms page.', () => {
      assertRendersPage(renderTermsPage);
    });

    it('should render the privacy page.', () => {
      assertRendersPage(renderPrivacyPage);
    });

    it('should render the status code page.', () => {
      const props = { match: { params: { code: '404' }, isExact: true, path: 'status-code/:code', url: null } } as RouteComponentProps<any>;
      assertRendersPage(renderStatusCodePage, props);
    });
  });
});
