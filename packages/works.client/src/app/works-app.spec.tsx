/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import Axios, { AxiosResponse } from 'axios';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { renderPrivacyPage, renderStatusCodePage, renderTermsPage, ZthunworksApp } from './works-app';

jest.mock('axios');

describe('ZthunworksApp', () => {
  let profile: IZProfile;

  beforeEach(() => {
    profile = new ZProfileBuilder().display('Administrator').email('admin@zthunworks.com').build();

    jest.spyOn(Axios, 'get').mockResolvedValue(profile);
  });

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
      (Axios.get as unknown as jest.Mock<Promise<AxiosResponse<string>>>).mockResolvedValue({ data: '', status: 200, statusText: 'Success', headers: [], config: null });
      assertRendersPage(renderTermsPage);
    });

    it('should render the privacy page.', () => {
      (Axios.get as unknown as jest.Mock<Promise<AxiosResponse<string>>>).mockResolvedValue({ data: '', status: 200, statusText: 'Success', headers: [], config: null });
      assertRendersPage(renderPrivacyPage);
    });

    it('should render the status code page.', () => {
      const props = { match: { params: { code: '404' }, isExact: true, path: 'status-code/:code', url: null } } as RouteComponentProps<any>;
      assertRendersPage(renderStatusCodePage, props);
    });
  });
});
