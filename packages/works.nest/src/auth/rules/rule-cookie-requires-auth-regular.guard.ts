import { ForbiddenException, Injectable } from '@nestjs/common';
import { IZUser, ZAssert } from '@zthun/works.core';
import { ZRuleCookieRequiresAuth } from './rule-cookie-requires-auth.guard';

@Injectable()
export class ZRuleCookieRequiresAuthRegular extends ZRuleCookieRequiresAuth {
  public claim(user: IZUser) {
    ZAssert.claim(!user.super, 'You cannot perform this action on the super user.').assert((msg) => new ForbiddenException(msg));
  }
}
