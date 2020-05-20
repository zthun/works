import { NotFoundException } from '@nestjs/common';
import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IZUser, ZUserBuilder } from '@zthun/auth.core';
import { Request } from 'express';
import { createSpyObj } from 'jest-createspyobj';
import { ZUsersService } from '../users/users.service';
import { ZRuleParamRequiresExistingUser } from './rule-param-requires-existing-user.guard';

describe('ZRuleParamRequiresExistingUser', () => {
  let users: jest.Mocked<ZUsersService>;
  let user: IZUser;
  let req: jest.Mocked<Request>;
  let host: jest.Mocked<HttpArgumentsHost>;
  let context: jest.Mocked<ExecutionContext>;

  function createTestTarget() {
    return new ZRuleParamRequiresExistingUser(users);
  }

  beforeEach(() => {
    user = new ZUserBuilder().email('cable@marvel.com').password('pa$$word1').id('0').build();

    req = (createSpyObj('req', ['text']) as unknown) as jest.Mocked<Request>;
    req.params = { id: user._id };

    host = (createSpyObj('host', ['getRequest']) as unknown) as jest.Mocked<HttpArgumentsHost>;
    host.getRequest.mockReturnValue(req);

    context = (createSpyObj('context', ['switchToHttp']) as unknown) as jest.Mocked<ExecutionContext>;
    context.switchToHttp.mockReturnValue(host);

    users = createSpyObj(ZUsersService, ['findById']);
    users.findById.mockResolvedValue(user);
  });

  it('return true if all rules pass.', async () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = await target.canActivate(context);
    // Assert
    expect(actual).toBeTruthy();
  });

  it('throws an NotFoundException if the user is not found.', async () => {
    // Arrange
    const target = createTestTarget();
    users.findById.mockResolvedValue(null);
    // Act
    const actual = target.canActivate(context);
    // Assert
    await expect(actual).rejects.toBeInstanceOf(NotFoundException);
  });
});
