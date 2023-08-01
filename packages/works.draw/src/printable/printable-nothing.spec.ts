import { describe, expect, it } from 'vitest';
import { ZPrintableNothing } from './printable-nothing';

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
