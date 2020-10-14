import { ZHash } from './hash.class';

describe('ZHash', () => {
  it('should return an md5 hash.', () => {
    // Arrange
    const message = 'Message to hash';
    const expected = '3732c3dbf824d79dc3f8802e83b0bd52';
    // Act
    const actual = ZHash.md5(message);
    // Assert
    expect(actual).toEqual(expected);
  });

  it('should return a new guid.', () => {
    // Arrange
    // Act
    const actual = ZHash.guid();
    // Assert
    expect(actual).toBeTruthy();
  });
});
