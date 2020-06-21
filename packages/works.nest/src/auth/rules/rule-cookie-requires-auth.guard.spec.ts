import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ZUserBuilder } from '@zthun/works.core';
import { Request } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZTokensService } from '../tokens/tokens.service';
import { ZRuleCookieRequiresAuth } from './rule-cookie-requires-auth.guard';

describe('ZRuleCookieRequestAuth', () => {
  it('return true if all rules pass.', async () => {
    // Arrange
    const user = new ZUserBuilder().email('cable@marvel.com').password('pa$$word1').build();
    const jwt = createSpyObj(ZTokensService, ['extract']);
    jwt.extract.mockResolvedValue(user);
    const target = new (class extends ZRuleCookieRequiresAuth {
      public claim = jest.fn();
    })(jwt);
    const req = (createSpyObj('req', ['text']) as unknown) as jest.Mocked<Request>;
    const host = (createSpyObj('host', ['getRequest']) as unknown) as jest.Mocked<HttpArgumentsHost>;
    host.getRequest.mockReturnValue(req);
    const context = (createSpyObj('context', ['switchToHttp']) as unknown) as jest.Mocked<ExecutionContext>;
    context.switchToHttp.mockReturnValue(host);
    // Act
    const actual = await target.canActivate(context);
    // Assert
    expect(actual).toBeTruthy();
  });
});
