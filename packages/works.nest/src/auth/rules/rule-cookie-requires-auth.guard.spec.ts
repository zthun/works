import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IZUser, ZUserBuilder } from '@zthun/works.core';
import { Request } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZTokensService } from '../tokens/tokens.service';
import { ZRuleCookieRequiresAuth } from './rule-cookie-requires-auth.guard';

describe('ZRuleCookieRequestAuth', () => {
  let jwt: jest.Mocked<ZTokensService>;
  let user: IZUser;
  let req: jest.Mocked<Request>;
  let host: jest.Mocked<HttpArgumentsHost>;
  let context: jest.Mocked<ExecutionContext>;

  function createTestTarget() {
    return new ZRuleCookieRequiresAuth(jwt);
  }

  beforeEach(() => {
    user = new ZUserBuilder().email('cable@marvel.com').password('pa$$word1').build();

    req = (createSpyObj('req', ['text']) as unknown) as jest.Mocked<Request>;

    host = (createSpyObj('host', ['getRequest']) as unknown) as jest.Mocked<HttpArgumentsHost>;
    host.getRequest.mockReturnValue(req);

    context = (createSpyObj('context', ['switchToHttp']) as unknown) as jest.Mocked<ExecutionContext>;
    context.switchToHttp.mockReturnValue(host);

    jwt = createSpyObj(ZTokensService, ['extract']);
    jwt.extract.mockResolvedValue(user);
  });

  it('return true if all rules pass.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.canActivate(context);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('throws an UnauthorizedException if the user is not found.', async () => {
    // Arrange
    const target = createTestTarget();
    jwt.extract.mockResolvedValue(null);
    // Act
    const actual = target.canActivate(context);
    // Assert
    await expect(actual).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
