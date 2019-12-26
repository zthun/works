import { HttpException } from '@nestjs/common';
import { trim } from 'lodash';

export class ZHttpAssert {
  /**
   * Makes an assertion claim.
   *
   * @param claim The claim to check.
   * @param fail The factory method that constructs the exception to throw if claim is falsy.
   */
  public static assert<E extends HttpException>(claim: boolean, fail: () => E): void {
    if (!claim) {
      throw fail();
    }
  }

  /**
   * Makes a claim that a string value is not a falsy value after trim.
   *
   * @param val The value to check.
   * @param fail The factory object that constructs the exception to thorw if val is falsy after a trim.
   */
  public static assertNotBlank<E extends HttpException>(val: string, fail: () => E) {
    let check = val || '';
    check = trim(val);
    ZHttpAssert.assert(!!check, fail);
  }
}
