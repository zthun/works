import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { IZLogin, ZAssert, ZLoginBuilder } from '@zthun/works.core';
import { ZUsersService } from '../users/users.service';

@Injectable()
export class ZRuleBodyRequiresCredentials implements CanActivate {
  public constructor(private readonly _users: ZUsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const login = context.switchToHttp().getRequest().body as IZLogin;
    const valid = await this._users.compare(new ZLoginBuilder().copy(login).build());
    ZAssert.claim(valid, 'Your credentials are incorrect.  Please try again.').assert((msg) => new UnauthorizedException(msg));
    return true;
  }
}
