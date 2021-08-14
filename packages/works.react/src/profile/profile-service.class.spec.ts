/* eslint-disable require-jsdoc */
import { IZProfile, ZLoginBuilder, ZProfileAvatarSize, ZProfileBuilder } from '@zthun/works.core';
import { IZHttpRequest, ZHttpCodeClient, ZHttpCodeSuccess, ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import md5 from 'md5';
import { ZProfileService } from './profile-service.class';

describe('ZProfileService', () => {
  let http: ZHttpServiceMock;
  let profile: IZProfile;
  let avatar: string;

  function createTestTarget() {
    return new ZProfileService(http);
  }

  beforeEach(() => {
    avatar = 'data:text/plain;Avatar';
    profile = new ZProfileBuilder().email('gambit@marvel.com').display('Gambit').avatar(avatar).build();

    const profiles = ZProfileService.createProfilesUrl();
    const tokens = ZProfileService.createTokensUrl();

    http = new ZHttpServiceMock();

    http.set(profiles, ZHttpMethod.Get, new ZHttpResultBuilder().data(profile).status(ZHttpCodeSuccess.OK).build());
    http.set(profiles, ZHttpMethod.Delete, new ZHttpResultBuilder().data(null).status(ZHttpCodeSuccess.OK).build());
    http.set(profiles, ZHttpMethod.Put, (req: IZHttpRequest<Partial<IZProfile>>) => {
      const updated = new ZProfileBuilder().copy(profile).assign(req.body).build();
      const res = new ZHttpResultBuilder().data(updated).status(ZHttpCodeSuccess.OK).build();
      return Promise.resolve(res);
    });

    http.set(tokens, ZHttpMethod.Post, new ZHttpResultBuilder().data(null).status(ZHttpCodeSuccess.OK).build());
    http.set(tokens, ZHttpMethod.Delete, new ZHttpResultBuilder().status(ZHttpCodeSuccess.OK).build());
  });

  describe('Read', () => {
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
      http.set(ZProfileService.createProfilesUrl(), ZHttpMethod.Get, new ZHttpResultBuilder().status(ZHttpCodeClient.Forbidden).build());
      const target = createTestTarget();
      // Act
      const actual = await target.read();
      // Assert
      expect(actual).toBeNull();
    });
  });

  describe('Update', () => {
    it('should return the updated profile.', async () => {
      // Arrange
      const target = createTestTarget();
      const update: Partial<IZProfile> = { display: 'Logan' };
      const expected = new ZProfileBuilder().copy(profile).assign(update).build();
      // Act
      const actual = await target.update(update);
      // Assert
      expect(actual).toEqual(expected);
    });
  });

  describe('Delete', () => {
    it('should delete the profile.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.delete().catch((err) => Promise.resolve(err));
      // Assert
      expect(actual).toBeUndefined();
    });
  });

  describe('Avatar', () => {
    it('should return the default gravatar url for a falsy profile.', async () => {
      // Arrange
      const expected = new ZUrlBuilder().gravatar(null, ZProfileAvatarSize).build();
      const target = createTestTarget();
      // Act
      const actual = await target.getAvatar(null);
      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return the gravatar url if the avatar for the profile is not set.', async () => {
      // Arrange
      const hash = md5(profile.email);
      profile = new ZProfileBuilder().copy(profile).avatar(null).build();
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
      profile = new ZProfileBuilder().copy(profile).display(null).build();
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

  describe('Login', () => {
    it('should return the profile that was successfully logged in.', async () => {
      // Arrange
      const target = createTestTarget();
      const credentials = new ZLoginBuilder().email('gambit@marvel.com').password('crappy-password').build();
      // Act
      const actual = await target.login(credentials);
      // Assert
      expect(actual).toEqual(profile);
    });
  });

  describe('Logout', () => {
    it('should log the user out from the system.', async () => {
      // Arrange
      const target = createTestTarget();
      http.set(ZProfileService.createTokensUrl(), ZHttpMethod.Delete, new ZHttpResultBuilder().data(true).status(ZHttpCodeSuccess.OK).build());
      // Act
      const actual = await target.logout();
      // Assert
      expect(actual).toBeUndefined();
    });
  });
});
