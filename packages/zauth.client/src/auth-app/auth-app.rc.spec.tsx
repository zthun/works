import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ZAuthApp } from './auth-app.rc';

describe('ZAuthApp', () => {
  let container: HTMLElement;

  beforeEach(() => {
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
    await act(() => Promise.resolve(render(<ZAuthApp name='Anthony' />, container)));
    // Assert
    expect(container.innerHTML).toBeTruthy();
  });
});
