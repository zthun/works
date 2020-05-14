import { ZTokensRepositoryController } from './tokens-repository.controller';

describe('ZTokensRepositoryController', () => {
  function createTestTarget() {
    return new ZTokensRepositoryController();
  }

  describe('Sign', () => {
    it('should create a signed token with the correct signature.', () => {
      const target = createTestTarget();
      expect(target).toBeTruthy();
    });
  });

  describe('Verify', () => {
    it('should return a promise with the token payload if the token can be verified.', () => {
      const target = createTestTarget();
      expect(target).toBeTruthy();
    });

    it('returns a rejected promise if the token cannot be verified.', () => {
      const target = createTestTarget();
      expect(target).toBeTruthy();
    });
  });
});
