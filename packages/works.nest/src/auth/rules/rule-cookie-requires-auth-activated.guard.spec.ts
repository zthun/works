import { ZUserBuilder } from '@zthun/works.core';
import { createSpyObj } from 'jest-createspyobj';
import { v4 } from 'uuid';
import { ZTokensService } from '../tokens/tokens.service';
import { ZRuleCookieRequiresAuthActivated } from './rule-cookie-requires-auth-activated.guard';

describe('ZRuleCookieRequestAuthAny', () => {
  function createTestTarget() {
    return new ZRuleCookieRequiresAuthActivated(createSpyObj(ZTokensService, ['extract']));
  }

  it('does nothing if all rules pass', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(() => target.claim(new ZUserBuilder().active().build())).not.toThrow();
  });

  it('throws a ForbiddenException if the user is not activated.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(() => target.claim(new ZUserBuilder().inactive(v4()).build())).toThrow();
  });
});
