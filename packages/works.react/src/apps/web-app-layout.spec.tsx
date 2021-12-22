import { render, waitFor } from '@testing-library/react';
import { createMocked } from '@zthun/works.jest';
import { ZUrlBuilder } from '@zthun/works.url';
import React from 'react';
import { IZIdentityService, ZIdentityServiceContext } from '../identity/identity-service.context';
import { ZWebAppLayout } from './web-app-layout';
import { IZWebAppService, ZWebAppServiceContext } from './web-app-service.context';

/* eslint-disable require-jsdoc */
describe('ZWebAppLayout', () => {
  let profileService: jest.Mocked<IZIdentityService>;
  let webAppService: jest.Mocked<IZWebAppService>;

  async function createTestTarget() {
    const target = render(
      <ZIdentityServiceContext.Provider value={profileService}>
        <ZWebAppServiceContext.Provider value={webAppService}>
          <ZWebAppLayout whoami='docs' />
        </ZWebAppServiceContext.Provider>
      </ZIdentityServiceContext.Provider>
    );

    await waitFor(() => expect(target.container.querySelector('.ZWebAppLayout-root')).not.toBeNull());
    return target;
  }

  beforeEach(() => {
    profileService = createMocked(['read', 'getAvatar', 'getDisplay']);
    profileService.read.mockRejectedValue('Not logged in.');
    profileService.getAvatar.mockResolvedValue(new ZUrlBuilder().gravatar().build());
    profileService.getDisplay.mockResolvedValue('');
    webAppService = createMocked<IZWebAppService>(['list']);
    webAppService.list.mockResolvedValue([]);
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
