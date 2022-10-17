/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { IZProfile, ZProfileBuilder } from '@zthun/works.core';
import {
  ZHttpCodeServer,
  ZHttpCodeSuccess,
  ZHttpMethod,
  ZHttpResultBuilder,
  ZHttpServiceMock
} from '@zthun/works.http';
import { ZIdentityService } from './identity-service';

describe('ZIdentityService', () => {
  let http: ZHttpServiceMock;
  let profile: IZProfile;
  let avatar: string;

  function createTestTarget() {
    return new ZIdentityService(http);
  }

  beforeEach(() => {
    avatar = 'data:text/plain;Avatar';
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').avatar(avatar).build();
    http = new ZHttpServiceMock();
  });

  describe('Read', () => {
    beforeEach(() => {
      http.set(ZIdentityService.createIdentityUrl(), ZHttpMethod.Get, new ZHttpResultBuilder(profile).build());
    });

    it('should return the profile on successful read.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.read();
      // Assert
      expect(actual).toEqual(profile);
    });

    it('should return null if the profile cannot be read.', async () => {
      // Arrange
      http.set(
        ZIdentityService.createIdentityUrl(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(null).status(ZHttpCodeServer.ServiceUnavailable).build()
      );
      const target = createTestTarget();
      // Act
      const actual = await target.read();
      // Assert
      expect(actual).toBeNull();
    });

    it('should return null if the service returns no content.', async () => {
      // Arrange
      http.set(
        ZIdentityService.createIdentityUrl(),
        ZHttpMethod.Get,
        new ZHttpResultBuilder(null).status(ZHttpCodeSuccess.NoContent).build()
      );
      const target = createTestTarget();
      // Act
      const actual = await target.read();
      // Assert
      expect(actual).toBeNull();
    });
  });
});
