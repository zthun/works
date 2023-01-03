/* eslint-disable require-jsdoc */
import { createMocked } from '@zthun/spellcraft-jest';
import { ZUserBuilder } from '@zthun/works.core';
import { ZRuleCookieRequiresAuthAny } from './rule-cookie-requires-auth-any.guard';

describe('ZRuleCookieRequestAuthAny', () => {
  function createTestTarget() {
    return new ZRuleCookieRequiresAuthAny(createMocked(['extract']));
  }

  it('does nothing if all rules pass', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(() => target.claim(new ZUserBuilder().build())).not.toThrow();
  });

  it('throws an UnauthorizedException if the user is not found.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(() => target.claim(null)).toThrow();
  });
});
