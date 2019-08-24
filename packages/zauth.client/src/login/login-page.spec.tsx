
import React from 'react';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { ZLoginForm } from './login-form';
import { ZLoginPage } from './login-page';

describe('ZLoginPage', () => {
  let renderer: ShallowRenderer;

  function createTestTarget() {
    renderer.render(<ZLoginPage />);
    return renderer.getRenderOutput();
  }

  beforeEach(() => {
    renderer = createRenderer();
  });

  it('renders the application', () => {
    // Arrange
    // Act
    const target = createTestTarget();
    // Assert
    expect(target.type).toEqual('div');
  });
});
