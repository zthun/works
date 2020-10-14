import { md5, ZProfileAvatarSize, ZProfileBuilder } from '@zthun/works.core';
import { ZUrlBuilder } from '@zthun/works.url';
import { getProfileAvatarUrl, getProfileDisplay } from './profile.util';

describe('Avatar', () => {
  it('should resolve the url to the gravatar url on a falsy profile.', () => {
    // Arrange
    const expected = new ZUrlBuilder().gravatar('', ZProfileAvatarSize).build();
    // Act
    const actual = getProfileAvatarUrl(null);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should resolve the url to the gravatar for the email for profiles without an avatar.', () => {
    // Arrange
    const email = 'gambit@marvel.com';
    const profile = new ZProfileBuilder().email(email).build();
    const expected = new ZUrlBuilder().gravatar(md5(email), ZProfileAvatarSize).build();
    // Act
    const actual = getProfileAvatarUrl(profile);
    // Assert
    expect(actual).toEqual(expected);
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

describe('Display', () => {
  it('should resolve the display to the empty string on a falsy profile.', () => {
    // Arrange
    // Act
    const actual = getProfileDisplay(null);
    // Assert
    expect(actual).toEqual('');
  });

  it('should resolve to the empty string on a profile with no email or display.', () => {
    // Arrange
    // Act
    const actual = getProfileDisplay(new ZProfileBuilder().build());
    // Assert
    expect(actual).toEqual('');
  });

  it('should resolve the display to the email on profile with no display.', () => {
    // Arrange
    const email = 'gambit@marvel.com';
    const profile = new ZProfileBuilder().email(email).build();
    // Act
    const actual = getProfileDisplay(profile);
    // Assert
    expect(actual).toEqual(email);
  });

  it('should resolve to the display on a profile with a display and an email.', () => {
    // Arrange
    const display = 'Gambit';
    const profile = new ZProfileBuilder().email('gambit@marvel.com').display(display).build();
    // Act
    const actual = getProfileDisplay(profile);
    // Assert
    expect(actual).toEqual(display);
  });
});
