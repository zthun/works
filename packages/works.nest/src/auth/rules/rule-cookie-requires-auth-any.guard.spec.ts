import { ZUserBuilder } from '@zthun/works.core';
import { createSpyObj } from 'jest-createspyobj';
import { ZTokensService } from '../tokens/tokens.service';
import { ZRuleCookieRequiresAuthAny } from './rule-cookie-requires-auth-any.guard';

describe('ZRuleCookieRequestAuthAny', () => {
  function createTestTarget() {
    return new ZRuleCookieRequiresAuthAny(createSpyObj(ZTokensService, ['extract']));
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
