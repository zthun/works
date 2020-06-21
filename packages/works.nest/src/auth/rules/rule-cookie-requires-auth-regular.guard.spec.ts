import { ZUserBuilder } from '@zthun/works.core';
import { createSpyObj } from 'jest-createspyobj';
import { ZTokensService } from '../tokens/tokens.service';
import { ZRuleCookieRequiresAuthRegular } from './rule-cookie-requires-auth-regular.guard';

describe('ZRuleCookieRequiresAuthRegular', () => {
  function createTestTarget() {
    return new ZRuleCookieRequiresAuthRegular(createSpyObj(ZTokensService, ['extract']));
  }

  it('does nothing if all rules pass', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(() => target.claim(new ZUserBuilder().build())).not.toThrow();
  });

  it('throws a ForbiddenException if the user is a super user.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    // Assert
    expect(() => target.claim(new ZUserBuilder().super().build())).toThrow();
  });
});
