import { act, render, RenderResult } from '@testing-library/react';
import React from 'react';
import { ZWebAppLayout } from './web-app-layout';

/* eslint-disable require-jsdoc */
describe('ZWebAppLayout', () => {
  async function createTestTarget() {
    let target: RenderResult;

    await act(async () => {
      target = render(<ZWebAppLayout headerText='Test Webapp' />);
    });

    return target;
  }

  it('should render the layout.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector('.ZWebAppLayout-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
