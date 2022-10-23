/* eslint-disable require-jsdoc */

import { act, render, waitFor } from '@testing-library/react';
import { createMocked } from '@zthun/works.jest';
import React from 'react';
import { IZWebAppService, ZWebAppServiceContext } from '../apps/web-app-service';
import { IZHealthService, ZHealthServiceContext } from '../health/health-service';
import { IZIdentityService, ZIdentityServiceContext } from '../identity/identity-service';
import { ZWebAppLayout } from './web-app-layout';

describe('ZWebAppLayout', () => {
  let identityService: jest.Mocked<IZIdentityService>;
  let healthService: jest.Mocked<IZHealthService>;
  let webAppService: jest.Mocked<IZWebAppService>;

  async function createTestTarget() {
    const target = render(
      <ZIdentityServiceContext.Provider value={identityService}>
        <ZWebAppServiceContext.Provider value={webAppService}>
          <ZHealthServiceContext.Provider value={healthService}>
            <ZWebAppLayout whoami='docs' />
          </ZHealthServiceContext.Provider>
        </ZWebAppServiceContext.Provider>
      </ZIdentityServiceContext.Provider>
    );

    await act(async () => new Promise((resolve) => setTimeout(resolve, 500)));
    await waitFor(() => expect(target.container.querySelector('.ZWebAppLayout-root')).not.toBeNull());
    await waitFor(() => expect(target.container.querySelector('.ZCircularProgress-root')).toBeFalsy());

    return target;
  }

  beforeEach(() => {
    identityService = createMocked(['read']);
    identityService.read.mockRejectedValue('Not logged in.');

    webAppService = createMocked<IZWebAppService>(['list', 'read']);
    webAppService.list.mockResolvedValue([]);
    webAppService.read.mockRejectedValue(new Error('App not found'));

    healthService = createMocked<IZHealthService>(['read']);
    healthService.read.mockResolvedValue(true);
  });

  it('should render the layout.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector('.ZWebAppLayout-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
