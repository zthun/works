import { identityAsync } from './identity-async.function';

describe('Identity async', () => {
  it('returns the value as a promise.', async () => {
    // Arrange
    const expected = 'identity';
    // Act
    const actual = await identityAsync(expected);
    // Assert
    expect(actual).toEqual(expected);
  });
});
