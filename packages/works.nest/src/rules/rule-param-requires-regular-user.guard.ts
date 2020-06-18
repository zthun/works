import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ZAssert } from '@zthun/works.core';
import { ZUsersService } from '../users/users.service';

@Injectable()
export class ZRuleParamRequiresRegularUser implements CanActivate {
  public constructor(private readonly _users: ZUsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context.switchToHttp().getRequest().params;
    const user = await this._users.findById(id);
    ZAssert.claim(!!user, `User with id, ${id}, was not found.`).assert((msg) => new NotFoundException(msg));
    ZAssert.claim(!user.super, 'You cannot perform this action on a super user.').assert((msg) => new ForbiddenException(msg));
    return true;
  }
}
