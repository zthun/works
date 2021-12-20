/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import React from 'react';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
import { IZIdentityService, ZIdentityServiceContext } from './identity-service.context';
import { useIdentityRoot, ZIdentityContext } from './identity.context';

function ZProfileRoot() {
  useIdentityRoot();
  return <div />;
}

describe('Identity', () => {
  let profile: IZProfile;
  let globalProfile: IZDataState<IZProfile>;
  let profileService: jest.Mocked<IZIdentityService>;

  async function createTestTarget() {
    const target = render(
      <ZIdentityContext.Provider value={globalProfile}>
        <ZIdentityServiceContext.Provider value={profileService}>
          <ZProfileRoot></ZProfileRoot>
        </ZIdentityServiceContext.Provider>
      </ZIdentityContext.Provider>
    );
    await waitFor(async () => !!globalProfile.data);
    return target;
  }

  beforeEach(() => {
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').active().build();

    globalProfile = new ZDataState(null);

    profileService = createMocked(['read']);
    profileService.read.mockResolvedValue(profile);
  });

  it('should set the global profile.', async () => {
    // Arrange
    await createTestTarget();
    // Act
    const currentProfile = globalProfile.data;
    // Assert
    expect(currentProfile).toBe(profile);
  });
});
