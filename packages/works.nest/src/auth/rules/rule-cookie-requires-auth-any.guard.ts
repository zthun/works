import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IZUser, ZAssert } from '@zthun/works.core';
import { ZRuleCookieRequiresAuth } from './rule-cookie-requires-auth.guard';

@Injectable()
export class ZRuleCookieRequiresAuthAny extends ZRuleCookieRequiresAuth {
  public claim(user: IZUser) {
    ZAssert.claim(!!user, 'You are not authenticated.  Please log in.').assert((msg) => new UnauthorizedException(msg));
  }
}
