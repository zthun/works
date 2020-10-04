import { render } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import Axios from 'axios';
import React from 'react';
import { ZthunworksApp } from './works-app';

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
});
