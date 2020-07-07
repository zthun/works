import { ConflictException, Injectable } from '@nestjs/common';
import { IZUser, ZAssert } from '@zthun/works.core';
import { ZRuleCookieRequiresAuth } from './rule-cookie-requires-auth.guard';

@Injectable()
export class ZRuleCookieRequiresAuthDeactivated extends ZRuleCookieRequiresAuth {
  public claim(user: IZUser) {
    ZAssert.claim(!!user.activator, 'This account has already been activated.').assert((msg) => new ConflictException(msg));
  }
}
