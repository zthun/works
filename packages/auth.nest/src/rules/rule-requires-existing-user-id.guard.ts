import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { ZAssert } from '@zthun/auth.core';
import { ZUsersService } from '../users/users.service';

@Injectable()
export class ZRuleRequiresExistingUserId implements CanActivate {
  public constructor(private readonly _users: ZUsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id } = context.switchToHttp().getRequest().params;
    const user = await this._users.findById(id);
    ZAssert.claim(!!user, `User with id, ${id}, was not found.`).assert((msg) => new NotFoundException(msg));
    return true;
  }
}
