/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import { createMocked } from '@zthun/works.jest';
import React from 'react';
import { ZDataState } from '../store/data-state.class';
import { IZDataState } from '../store/data-state.interface';
import { IZProfileService, ZProfileServiceContext } from './profile-service.context';
import { useProfileRoot, ZProfileContext } from './profile.context';

function ZProfileRoot() {
  useProfileRoot();
  return <div />;
}

describe('Profile', () => {
  let profile: IZProfile;
  let globalProfile: IZDataState<IZProfile>;
  let profileService: jest.Mocked<IZProfileService>;

  async function createTestTarget() {
    const target = render(
      <ZProfileContext.Provider value={globalProfile}>
        <ZProfileServiceContext.Provider value={profileService}>
          <ZProfileRoot></ZProfileRoot>
        </ZProfileServiceContext.Provider>
      </ZProfileContext.Provider>
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
