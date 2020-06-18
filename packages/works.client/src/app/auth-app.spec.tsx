import { render } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import Axios from 'axios';
import React from 'react';
import { ZAuthApp } from './auth-app';

jest.mock('axios');

describe('ZAuthApp', () => {
  let profile: IZProfile;

  beforeEach(() => {
    profile = new ZProfileBuilder().display('Administrator').email('admin@zthunworks.com').super().build();

    jest.spyOn(Axios, 'get').mockResolvedValue(profile);
  });

  it('renders the application', () => {
    // Arrange
    const target = render(<ZAuthApp />);
    // Act
    const actual = target.queryByTestId('ZAuthApp-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
