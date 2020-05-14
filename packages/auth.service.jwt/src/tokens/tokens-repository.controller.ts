import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

/**
 * Represents a service to sign and verify jwt tokens.
 */
@Controller()
export class ZTokensRepositoryController {
  /**
   * Signs a token and returns the token string.
   *
   * @return A promise that, when resolved, has returned the signed token.
   */
  @MessagePattern('sign')
  public async sign(payload: any): Promise<string> {
    return Promise.reject('Not implemented');
  }

  /**
   * Verifies a token.
   *
   * @param token The token to validate.
   *
   * @returns A promise that, when resolved, returns the payload.  Returns a rejected promise if the
   *          token is not valid or has expired.
   */
  @MessagePattern('verify')
  public async verify(token: string): Promise<any> {
    return Promise.reject('Not implemented');
  }
}
