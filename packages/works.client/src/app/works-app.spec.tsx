/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { renderPrivacyPage, renderStatusCodePage, renderTermsPage, ZthunworksApp } from './works-app';

describe('ZthunworksApp', () => {
  it('renders the application', () => {
    // Arrange
    const target = render(<ZthunworksApp />);
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
