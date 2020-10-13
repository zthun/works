import { getGravatarUrl, ZGravatarUrl } from './gravatar.function';

describe('Gravatar', () => {
  it('returns the default url for a falsy hash.', () => {
    // Arrange
    const expected = `${ZGravatarUrl}/?s=80`;
    // Act
    const url = getGravatarUrl();
    // Assert
    expect(url).toEqual(expected);
  });

  it('returns the url with the appropriate hash and size.', () => {
    // Arrange
    const hash = 'd41d8cd98f00b204e9800998ecf8427e';
    const size = 128;
    const expected = `${ZGravatarUrl}/${hash}?s=${size}`;
    // Act
    const url = getGravatarUrl(hash, size);
    // Assert
    expect(url).toEqual(expected);
  });
});
