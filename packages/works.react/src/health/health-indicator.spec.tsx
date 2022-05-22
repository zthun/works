/* eslint-disable require-jsdoc */

import { render, RenderResult, waitFor } from '@testing-library/react';
import { createMocked } from '@zthun/works.jest';
import { noop } from 'lodash';
import React from 'react';
import { ZHealthIndicator } from './health-indicator';
import { IZHealthService, ZHealthServiceContext } from './health-service.context';

describe('ZHealthIndicator', () => {
  let health: jest.Mocked<IZHealthService>;

  async function createTestTarget() {
    const target = render(
      <ZHealthServiceContext.Provider value={health}>
        <ZHealthIndicator />
      </ZHealthServiceContext.Provider>
    );

    await waitFor(() => expect(target.container.querySelector('.ZHealthIndicator-root')).toBeTruthy());
    return target;
  }

  beforeEach(() => {
    health = createMocked(['read']);
  });

  async function waitForIndicator(expected: 'ok' | 'warn', target: RenderResult) {
    await waitFor(() => {
      const actual = target.container.querySelector(`.ZHealthIndicator-${expected}`);
      expect(actual).toBeTruthy();
    });
  }

  it('should render a loading indicator if the health is loading.', async () => {
    // Arrange
    health.read.mockReturnValue(new Promise(noop));
    const target = await createTestTarget();
    // Act & Assert
    const actual = target.container.querySelector('.ZCircularProgress-root');
    // Assert
    expect(actual).toBeTruthy();
  });

  it('should render ok if the service returns true.', async () => {
    // Arrange
    health.read.mockResolvedValue(true);
    const target = await createTestTarget();
    // Act & Assert
    await waitForIndicator('ok', target);
  });

  it('should render error if the service is down.', async () => {
    // Arrange
    health.read.mockResolvedValue(false);
    const target = await createTestTarget();
    // Act & Assert
    await waitForIndicator('warn', target);
  });
});
