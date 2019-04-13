import { HttpException } from '@nestjs/common';

export class ZHttpAssert {
  public static assert<E extends HttpException>(claim: boolean, fail: () => E) {
    if (!claim) {
      throw fail();
    }
  }
}
