import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { sign, SignOptions, verify } from 'jsonwebtoken';

/**
 * Represents a service to sign and verify jwt tokens.
 */
@Controller()
export class ZTokensRepositoryController {
  /**
   * Signs a token and returns the token string.
   *
   * @param payload The payload object to convert to a jwt token.
   * @param secret The secret to sign the token with.
   *
   * @return A promise that, when resolved, has returned the signed token.
   */
  @MessagePattern('sign')
  public async sign({ payload, secret }: { payload: any; secret: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      const options: SignOptions = {
        expiresIn: '24h'
      };
      sign(payload, secret, options, (err: Error | null, jwt: string | undefined) => {
        if (err) {
          reject(err);
        }
        resolve(jwt);
      });
    });
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
  public async verify({ token, secret }: { token: string; secret: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      verify(token, secret, (err: Error | null, decoded: object | undefined) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
  }
}
