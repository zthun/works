import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ZAssert } from '@zthun/works.core';
import { Request } from 'express';
import { ZTokensService } from '../tokens/tokens.service';

@Injectable()
export class ZRuleCookieRequiresAuthSuper implements CanActivate {
  public constructor(private readonly _jwt: ZTokensService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const user = await this._jwt.extract(request);
    ZAssert.claim(!!user, 'You are not authenticated.  Please log in.').assert((msg) => new UnauthorizedException(msg));
    ZAssert.claim(user.super, 'You do not have permission to access this resource.').assert((msg) => new ForbiddenException(msg));
    return true;
  }
}
