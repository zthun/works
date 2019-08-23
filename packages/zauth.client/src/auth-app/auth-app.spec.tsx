import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act, createRenderer, ShallowRenderer } from 'react-dom/test-utils';
import { ZAuthApp } from './auth-app';

describe('ZAuthApp', () => {
  let container: HTMLElement;
  let renderer: ShallowRenderer;

  beforeEach(() => {
    renderer = createRenderer();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders the application', async () => {
    // Arrange
    // Act
    await act(() => Promise.resolve(renderer.render(<ZAuthApp />, container)));
    // Assert
    expect(container.innerHTML).toBeTruthy();
  });
});
