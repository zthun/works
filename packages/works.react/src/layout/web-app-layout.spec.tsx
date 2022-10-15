/* eslint-disable require-jsdoc */

import { act, render, waitFor } from '@testing-library/react';
import { createMocked } from '@zthun/works.jest';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { IZWebAppService, ZWebAppServiceContext } from '../apps/web-app-service';
import { IZHealthService, ZHealthServiceContext } from '../health/health-service.context';
import { IZIdentityService, ZIdentityServiceContext } from '../identity/identity-service.context';
import { ZWebAppLayout } from './web-app-layout';

describe('ZWebAppLayout', () => {
  let profileService: jest.Mocked<IZIdentityService>;
  let healthService: jest.Mocked<IZHealthService>;
  let webAppService: jest.Mocked<IZWebAppService>;

  async function createTestTarget() {
    const target = render(
      <ZIdentityServiceContext.Provider value={profileService}>
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
    profileService = createMocked(['read', 'getAvatar', 'getDisplay']);
    profileService.read.mockRejectedValue('Not logged in.');
    profileService.getAvatar.mockResolvedValue(new ZUrlBuilder().gravatar().build());
    profileService.getDisplay.mockResolvedValue('');

    webAppService = createMocked<IZWebAppService>(['list']);
    webAppService.list.mockResolvedValue([]);

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
