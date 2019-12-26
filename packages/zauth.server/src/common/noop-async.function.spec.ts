import { noopAsync } from './noop-async.function';

describe('Noop Async', () => {
  it('returns undefined.', async () => {
    // Arrange
    // Act
    const actual = await noopAsync();
    // Assert
    expect(actual).toBeUndefined();
  });
});
