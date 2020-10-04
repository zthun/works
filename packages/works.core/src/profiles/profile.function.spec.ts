import { ZProfileBuilder } from './profile-builder.class';
import { getGravatarUrl, getProfileAvatarUrl } from './profile.function';

describe('Avatar', () => {
  it('should resolve the url to the gravatar url on a falsy profile.', () => {
    // Arrange
    // Act
    const actual = getProfileAvatarUrl(null);
    // Assert
    expect(actual).toEqual(getGravatarUrl());
  });

  it('should resolve the url to the gravatar for the email for profiles without an avatar.', () => {
    // Arrange
    const email = 'gambit@marvel.com';
    const profile = new ZProfileBuilder().email(email).build();
    // Act
    const actual = getProfileAvatarUrl(profile);
    // Assert
    expect(actual).toEqual(getGravatarUrl(email));
  });

  it('should resolve the url to the avatar set in the profile first.', () => {
    // Arrange
    const email = 'gambit@marvel.com';
    const avatar = 'https://steamavatar.io/img/14777429602y3IT.jpg';
    const profile = new ZProfileBuilder().email(email).avatar(avatar).build();
    // Act
    const actual = getProfileAvatarUrl(profile);
    // Assert
    expect(actual).toEqual(avatar);
  });
});
