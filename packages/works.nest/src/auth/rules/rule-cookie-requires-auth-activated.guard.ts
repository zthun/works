import { ForbiddenException, Injectable } from '@nestjs/common';
import { IZUser, ZAssert } from '@zthun/works.core';
import { ZRuleCookieRequiresAuth } from './rule-cookie-requires-auth.guard';

@Injectable()
export class ZRuleCookieRequiresAuthActivated extends ZRuleCookieRequiresAuth {
  public claim(user: IZUser) {
    ZAssert.claim(!user.activator, 'Your account has not been activated.  Please activate your account before performing this action.').assert((msg) => new ForbiddenException(msg));
  }
}
