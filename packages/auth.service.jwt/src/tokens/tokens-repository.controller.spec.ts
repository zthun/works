import { ZTokensRepositoryController } from './tokens-repository.controller';

describe('ZTokensRepositoryController', () => {
  let secret: string;
  let payload: any;

  function createTestTarget() {
    return new ZTokensRepositoryController();
  }

  beforeEach(() => {
    secret = 'my-secret-key';
    payload = {
      user: '1234',
      food: 'burger'
    };
  });

  it('should create a signed token with the correct signature.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const token = await target.sign({ payload, secret });
    const actual = await target.verify({ token, secret });
    // Assert
    expect(actual).toEqual(jasmine.objectContaining(payload));
  });

  it('should reject a signature if the secret is falsy.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.sign({ payload, secret: null });
    // Assert
    await expect(actual).rejects.toBeTruthy();
  });

  it('should reject a token that is not decoded with the correct secret.', async () => {
    // Arrange
    const target = createTestTarget();
    const wrong = 'not-the-right-secret';
    // Act
    const token = await target.sign({ payload, secret });
    const actual = target.verify({ token, secret: wrong });
    // Assert
    await expect(actual).rejects.toBeTruthy();
  });
});
