import { ZAssert } from './assert.class';

describe('ZAssert', () => {
  function createTestTarget() {
    return new ZAssert();
  }

  describe('Claims', () => {
    it('throws a single string if only one claim fails.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.claim(true, 'Should not throw').claim(true, 'Should also not throw').claim(false, 'Should throw');
      // Assert
      expect(() => actual.assert((msg) => new Error(msg))).toThrow();
    });

    it('throws an array of errors if multiple claims are false.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.claim(false, 'Should throw').claim(false, 'Should also throw');
      // Assert
      expect(() => actual.assert((msg) => new Error(msg))).toThrow();
    });

    it('does not throw an exception if the claim is true.', () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = target.claim(true, 'Should not throw');
      // Assert
      expect(() => actual.assert((msg) => new Error(msg))).not.toThrow();
    });
  });
});
