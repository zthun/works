import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { createMocked } from '@zthun/spellcraft-jest';
import { ZUserBuilder } from '@zthun/works.core';
import { Request } from 'express';
import { ZRuleCookieRequiresAuth } from './rule-cookie-requires-auth.guard';
import { ZSecurityService } from './security.service';

describe('ZRuleCookieRequestAuth', () => {
  it('return true if all rules pass.', async () => {
    // Arrange
    const user = new ZUserBuilder().email('cable@marvel.com').password('pa$$word1').build();
    const jwt = createMocked<ZSecurityService>(['extract']);
    jwt.extract.mockResolvedValue(user);
    const target = new (class extends ZRuleCookieRequiresAuth {
      public claim = jest.fn();
    })(jwt);
    const req = createMocked<Request>(['get']);
    const host = createMocked<HttpArgumentsHost>(['getRequest']);
    host.getRequest.mockReturnValue(req);
    const context = createMocked<ExecutionContext>(['switchToHttp']);
    context.switchToHttp.mockReturnValue(host);
    // Act
    const actual = await target.canActivate(context);
    // Assert
    expect(actual).toBeTruthy();
  });
});
