import { NotFoundException } from '@nestjs/common';
import { ZHttpAssert } from './http-assert.class';

describe('ZHttpAssert', () => {

  describe('Claims', () => {
    it('throws the exception if the claim is false.', () => {
      // Arrange
      // Act
      // Assert
      expect(() => ZHttpAssert.assert(false, () => new NotFoundException())).toThrow();
    });

    it('does not throw an exception if the claim is true.', () => {
      // Arrange
      // Act
      // Assert
      expect(() => ZHttpAssert.assert(true, () => new NotFoundException())).not.toThrow();
    });
  });

  describe('Blank', () => {
    it('throws an exception if the string is falsy.', () => {
      // Arrange
      // Act
      // Assert
      expect(() => ZHttpAssert.assertNotBlank('', () => new NotFoundException())).toThrow();
    });

    it('throws an exception if the string is null.', () => {
      // Arrange
      // Act
      // Assert
      expect(() => ZHttpAssert.assertNotBlank(null, () => new NotFoundException())).toThrow();
    });

    it('throws an exception if the string is undefined.', () => {
      // Arrange
      // Act
      // Assert
      expect(() => ZHttpAssert.assertNotBlank(undefined, () => new NotFoundException())).toThrow();
    });

    it('throws an exception if the string is white space.', () => {
      // Arrange
      // Act
      // Assert
      expect(() => ZHttpAssert.assertNotBlank('  \r\n\t', () => new NotFoundException())).toThrow();
    });

    it('does not throw if the string is truthy.', () => {
      // Arrange
      // Act
      // Assert
      expect(() => ZHttpAssert.assertNotBlank('truthy', () => new NotFoundException())).not.toThrow();
    });
  });
});
