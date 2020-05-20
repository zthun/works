import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IZUser, ZUserBuilder } from '@zthun/auth.core';
import { Request } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZJwtService } from '../tokens/jwt.service';
import { ZRuleCookieRequiresAuthSuper } from './rule-cookie-requires-auth-super.guard';

describe('ZRuleCookieRequiresAuthSuper', () => {
  let jwt: jest.Mocked<ZJwtService>;
  let user: IZUser;
  let req: jest.Mocked<Request>;
  let host: jest.Mocked<HttpArgumentsHost>;
  let context: jest.Mocked<ExecutionContext>;

  function createTestTarget() {
    return new ZRuleCookieRequiresAuthSuper(jwt);
  }

  beforeEach(() => {
    user = new ZUserBuilder().email('gambit@marvel.com').password('weak').super().build();

    req = (createSpyObj('req', ['text']) as unknown) as jest.Mocked<Request>;

    host = (createSpyObj('host', ['getRequest']) as unknown) as jest.Mocked<HttpArgumentsHost>;
    host.getRequest.mockReturnValue(req);

    context = (createSpyObj('context', ['switchToHttp']) as unknown) as jest.Mocked<ExecutionContext>;
    context.switchToHttp.mockReturnValue(host);

    jwt = createSpyObj(ZJwtService, ['extract']);
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

  it('throws a ForbiddenException if the user is not the super user.', async () => {
    // Arrange
    const target = createTestTarget();
    jwt.extract.mockResolvedValue(new ZUserBuilder().build());
    // Act
    const actual = target.canActivate(context);
    // Assert
    await expect(actual).rejects.toBeInstanceOf(ForbiddenException);
  });
});
