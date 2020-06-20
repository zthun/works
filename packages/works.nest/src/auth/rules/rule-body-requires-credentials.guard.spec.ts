import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IZLogin, ZLoginBuilder } from '@zthun/works.core';
import { Request } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZUsersService } from '../../users/users.service';
import { ZRuleBodyRequiresCredentials } from './rule-body-requires-credentials.guard';

describe('ZRuleBodyRequiresCredentials', () => {
  let users: jest.Mocked<ZUsersService>;
  let login: IZLogin;
  let req: jest.Mocked<Request>;
  let host: jest.Mocked<HttpArgumentsHost>;
  let context: jest.Mocked<ExecutionContext>;

  function createTestTarget() {
    return new ZRuleBodyRequiresCredentials(users);
  }

  beforeEach(() => {
    login = new ZLoginBuilder().email('gambit@marvel.com').password('weak').autoConfirm().build();

    req = (createSpyObj('req', ['text']) as unknown) as jest.Mocked<Request>;
    req.body = login;

    host = (createSpyObj('host', ['getRequest']) as unknown) as jest.Mocked<HttpArgumentsHost>;
    host.getRequest.mockReturnValue(req);

    context = (createSpyObj('context', ['switchToHttp']) as unknown) as jest.Mocked<ExecutionContext>;
    context.switchToHttp.mockReturnValue(host);

    users = createSpyObj(ZUsersService, ['compare']);
    users.compare.mockResolvedValue(true);
  });

  it('return true if all rules pass.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.canActivate(context);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('throws an Unauthorized exception if the credentials are incorrect.', async () => {
    // Arrange
    const target = createTestTarget();
    users.compare.mockResolvedValue(false);
    // Act
    const actual = target.canActivate(context);
    // Assert
    await expect(actual).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
