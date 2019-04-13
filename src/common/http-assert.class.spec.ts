import { NotFoundException } from '@nestjs/common';
import { ZHttpAssert } from './http-assert.class';

describe('ZHttpAssert', () => {
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
