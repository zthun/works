import { CanActivate, ConflictException, ExecutionContext, Injectable } from '@nestjs/common';
import { IZLogin, ZAssert } from '@zthun/auth.core';
import { ZUsersService } from '../users/users.service';

@Injectable()
export class ZRuleBodyRequiresUniqueUser implements CanActivate {
  public constructor(private readonly _users: ZUsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email } = context.switchToHttp().getRequest().body as IZLogin;
    const user = await this._users.findByEmail(email);
    ZAssert.claim(!user, `User with email, ${email}, already exists.`).assert((msg) => new ConflictException(msg));
    return true;
  }
}
