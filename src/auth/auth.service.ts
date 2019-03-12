import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public assert<E>(claim: boolean, fail: () => E) {
    if (!claim) {
      throw fail();
    }
  }
}
