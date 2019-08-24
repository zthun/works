import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { ZLoginPage } from '../login/login-page';
import { ZAuthApp } from './auth-app';

describe('ZAuthApp', () => {
  let renderer: ShallowRenderer;

  beforeEach(() => {
    renderer = createRenderer();
  });

  it('renders the application', async () => {
    // Arrange
    renderer.render(<ZAuthApp />);
    // Act
    const actual = renderer.getRenderOutput();
    // Assert
    expect(actual.type).toEqual('div');
    expect(actual.props.children).toEqual(<ZLoginPage />);
  });
});
