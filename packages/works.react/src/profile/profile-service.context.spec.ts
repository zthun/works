/* eslint-disable require-jsdoc */
import { IZProfile, ZLoginBuilder, ZProfileActivationBuilder, ZProfileAvatarSize, ZProfileBuilder } from '@zthun/works.core';
import { IZHttpRequest, ZHttpCodeClient, ZHttpCodeSuccess, ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZUrlBuilder } from '@zthun/works.url';
import md5 from 'md5';
import { v4 } from 'uuid';
import { ZProfileService } from './profile-service.context';

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
    http = new ZHttpServiceMock();
  });

  describe('Create', () => {
    beforeEach(() => {
      http.set(ZProfileService.createProfilesUrl(), ZHttpMethod.Post, new ZHttpResultBuilder().data(profile).build());
    });

    it('should create a new account.', async () => {
      // Arrange
      const target = createTestTarget();
      const credentials = new ZLoginBuilder().email(profile.email).password('crappy-password').autoConfirm().build();
      // Act
      const actual = await target.create(credentials);
      // Assert
      expect(actual).toEqual(profile);
    });
  });

  describe('Read', () => {
    beforeEach(() => {
      http.set(ZProfileService.createProfilesUrl(), ZHttpMethod.Get, new ZHttpResultBuilder().data(profile).build());
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
      http.set(ZProfileService.createProfilesUrl(), ZHttpMethod.Get, new ZHttpResultBuilder().status(ZHttpCodeClient.Forbidden).build());
      const target = createTestTarget();
      // Act
      const actual = await target.read();
      // Assert
      expect(actual).toBeNull();
    });
  });

  describe('Update', () => {
    beforeEach(() => {
      http.set(ZProfileService.createProfilesUrl(), ZHttpMethod.Put, (req: IZHttpRequest<Partial<IZProfile>>) => {
        const updated = new ZProfileBuilder().copy(profile).assign(req.body).build();
        const res = new ZHttpResultBuilder().data(updated).status(ZHttpCodeSuccess.OK).build();
        return Promise.resolve(res);
      });
    });

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
    beforeEach(() => {
      http.set(ZProfileService.createProfilesUrl(), ZHttpMethod.Delete, new ZHttpResultBuilder().data(null).status(ZHttpCodeSuccess.OK).build());
    });

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
    beforeEach(() => {
      http.set(ZProfileService.createProfilesUrl(), ZHttpMethod.Get, new ZHttpResultBuilder().data(profile).status(ZHttpCodeSuccess.OK).build());
      http.set(ZProfileService.createTokensUrl(), ZHttpMethod.Post, new ZHttpResultBuilder().data(null).status(ZHttpCodeSuccess.OK).build());
    });

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
    beforeEach(() => {
      http.set(ZProfileService.createTokensUrl(), ZHttpMethod.Delete, new ZHttpResultBuilder().status(ZHttpCodeSuccess.OK).build());
    });

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

  describe('Recovery', () => {
    beforeEach(() => {
      http.set(ZProfileService.createRecoveryUrl(), ZHttpMethod.Post, new ZHttpResultBuilder().status(ZHttpCodeSuccess.Created).build());
    });

    it('should send the recovery email.', async () => {
      // Arrange
      const target = createTestTarget();
      const credentials = new ZLoginBuilder().email(profile.email).build();
      // Act
      const actual = await target.recover(credentials).catch((err) => Promise.resolve(err));
      // Assert
      expect(actual).toBeUndefined();
    });
  });

  describe('Activation', () => {
    beforeEach(() => {
      http.set(ZProfileService.createActivationsUrl(), ZHttpMethod.Put, new ZHttpResultBuilder().data(profile).status(ZHttpCodeSuccess.OK).build());
    });

    it('should activate the users account.', async () => {
      // Arrange
      const target = createTestTarget();
      const activator = new ZProfileActivationBuilder().email('gambit@marvel.com').key(v4()).build();
      // Act
      const actual = await target.activate(activator);
      // Assert
      expect(actual).toEqual(profile);
    });
  });

  describe('Deactivation', () => {
    beforeEach(() => {
      http.set(ZProfileService.createActivationsUrl(), ZHttpMethod.Delete, new ZHttpResultBuilder().data(profile).status(ZHttpCodeSuccess.OK).build());
    });

    it('should deactivate the users account.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.deactivate();
      // Assert
      expect(actual).toEqual(profile);
    });
  });

  describe('Reactivation', () => {
    beforeEach(() => {
      http.set(ZProfileService.createActivationsUrl(), ZHttpMethod.Post, new ZHttpResultBuilder().data(profile).status(ZHttpCodeSuccess.OK).build());
    });

    it('should reactivate the users account.', async () => {
      // Arrange
      const target = createTestTarget();
      const activator = new ZProfileActivationBuilder().email('gambit@marvel.com').key(v4()).build();
      // Act
      const actual = await target.reactivate(activator);
      // Assert
      expect(actual).toEqual(profile);
    });
  });
});
