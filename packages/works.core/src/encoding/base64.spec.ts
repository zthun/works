import { btoa, atob } from './base64';

/**
 * Note:  Unit tests use jsdom to get browser based functionality.  So the global.btoa and global.atob are defined even
 * though nodejs does not have them when compiled.
 */

describe('Base64', () => {
  it('encodes using the browser based encoding.', () => {
    // Arrange
    const raw = 'This should be encoded.';
    const base64 = btoa(raw);
    // Act
    const actual = atob(base64);
    // Assert
    expect(actual).toEqual(raw);
  });

  it('encodes using the nodejs based encoding.', () => {
    // Arrange
    const raw = 'This should be encoded.';
    const base64 = btoa(raw, {});
    // Act
    const actual = atob(base64, {});
    // Assert
    expect(actual).toEqual(raw);
  });
});
