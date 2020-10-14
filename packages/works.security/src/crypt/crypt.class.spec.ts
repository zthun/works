import { ZCrypt } from './crypt.class';

describe('ZCrypt', () => {
  it('can hash and compare a secret.', async () => {
    // Arrange
    const secret = 'a-secret-that-is-not-very-strong';
    const hash = await ZCrypt.hash(secret);
    // Act
    const actual = await ZCrypt.compare(secret, hash);
    // Assert
    expect(actual).toBeTruthy();
  });
});
