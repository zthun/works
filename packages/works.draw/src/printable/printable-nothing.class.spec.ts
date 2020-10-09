/* eslint-disable require-jsdoc */
import { ZPrintableNothing } from './printable-nothing.class';

describe('ZPrintableNothing', () => {
  function createTestTarget() {
    return new ZPrintableNothing();
  }

  it('does nothing.', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    target.print();
    // Assert
    expect(true).toBeTruthy();
  });
});
