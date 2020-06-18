import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ZAssert } from '@zthun/auth.core';
import { Request } from 'express';
import { ZJwtService } from '../tokens/jwt.service';

@Injectable()
export class ZRuleCookieRequiresAuthRegular implements CanActivate {
  public constructor(private readonly _jwt: ZJwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const user = await this._jwt.extract(request);
    ZAssert.claim(!!user, 'You are not authenticated.  Please log in.').assert((msg) => new UnauthorizedException(msg));
    ZAssert.claim(!user.super, 'You cannot perform this action on the super user.').assert((msg) => new ForbiddenException(msg));
    return true;
  }
}
