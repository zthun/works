/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable require-jsdoc */
import { IZProfile, ZProfileAvatarSize, ZProfileBuilder } from '@zthun/works.core';
import {
  ZHttpCodeServer,
  ZHttpCodeSuccess,
  ZHttpMethod,
  ZHttpResultBuilder,
  ZHttpServiceMock
} from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import md5 from 'md5';
import { ZIdentityService } from './identity-service.context';

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

  describe('Avatar', () => {
    it('should return the default gravatar url for a falsy profile.', async () => {
      // Arrange
      const expected = new ZUrlBuilder().gravatar(undefined, ZProfileAvatarSize).build();
      const target = createTestTarget();
      // Act
      const actual = await target.getAvatar(null);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return the gravatar url if the avatar for the profile is not set.', async () => {
      // Arrange
      const hash = md5(profile.email!);
      profile = new ZProfileBuilder().copy(profile).avatar(undefined).build();
      const expected = new ZUrlBuilder().gravatar(hash, ZProfileAvatarSize).build();
      const target = createTestTarget();
      // Act
      const actual = await target.getAvatar(profile);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return the profiles avatar if it is set.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getAvatar(profile);
      // Assert
      expect(actual).toEqual(avatar);
    });
  });

  describe('Display', () => {
    it('should return the display text if the display is set.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getDisplay(profile);
      // Assert
      expect(actual).toEqual(profile.display);
    });

    it('should return the email text if the email is set but display is not.', async () => {
      // Arrange
      const target = createTestTarget();
      profile = new ZProfileBuilder().copy(profile).display(undefined).build();
      // Act
      const actual = await target.getDisplay(profile);
      // Assert
      expect(actual).toEqual(profile.email);
    });

    it('should display the empty string on a falsy profile.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.getDisplay(null);
      // Assert
      expect(actual).toEqual('');
    });

    it('should display the empty string if no email or display is set.', async () => {
      // Arrange
      const target = createTestTarget();
      profile = new ZProfileBuilder().build();
      // Act
      const actual = await target.getDisplay(profile);
      // Assert
      expect(actual).toEqual('');
    });
  });
});
