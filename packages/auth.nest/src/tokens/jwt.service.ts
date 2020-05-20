import { Inject, Injectable } from '@nestjs/common';
import { IZLogin, IZUser } from '@zthun/auth.core';
import { Request, Response } from 'express';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { get } from 'lodash';
import { DomainToken } from '../common/injection.constants';
import { ZUsersService } from '../users/users.service';

const _SECRET: string = 'quick-test-must-change-later';

/**
 * Represents a service that can be used to sign, verify, inject and extract a jwt token.
 */
@Injectable()
export class ZJwtService {
  /**
   * The name of the cookie that this service will inject.
   */
  public static readonly COOKIE_NAME = 'Authentication';

  /**
   * Initializes a new instance of this object.
   *
   * @param _domain The domain that the jwt is valid for.
   * @param _users The user repository for retrieving and updating users.
   */
  public constructor(@Inject(DomainToken) private readonly _domain: string, private readonly _users: ZUsersService) {}

  /**
   * Injects the jwt with the appropriate credentials into the response object.
   *
   * @param res The response object to inject the cookie into.
   * @param credentials The login credentials that contain the email to inject.
   *
   * @returns A promise that, when resolved, has injected the cookie.
   */
  public async inject(res: Response, credentials: IZLogin) {
    const jwt = await this.sign({ user: credentials.email }, _SECRET);
    const tomorrow = new Date(Date.now() + 3600000);
    res.cookie(ZJwtService.COOKIE_NAME, jwt, { secure: false, httpOnly: true, expires: tomorrow, domain: this._domain, sameSite: true });
  }

  /**
   * Extracts a user from a request object.
   *
   * @param req The request to extract the user from.
   *
   * @returns A promise that, when resolved, has extracted the user.
   */
  public async extract(req: Request): Promise<IZUser> {
    try {
      const token = get(req, `cookies[${ZJwtService.COOKIE_NAME}]`);
      const payload: { user: string } = await this.verify(token, _SECRET);
      const user = await this._users.findByEmail(payload.user);
      return user;
    } catch {
      return null;
    }
  }

  /**
   * Clears the authentication cookie from the response.
   *
   * @param res The response to clear the cookie from.
   *
   * @returns A promise that, when resolved, has cleared the auth cookie.
   */
  public async clear(res: Response) {
    res.clearCookie(ZJwtService.COOKIE_NAME);
  }

  /**
   * Signs a token and returns the token string.
   *
   * @param payload The payload object to convert to a jwt token.
   * @param secret The secret to use when signing the token.
   *
   * @return A promise that, when resolved, has returned the signed token.
   */
  public async sign(payload: object, secret: string): Promise<string> {
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
  public async verify(token: string, secret: string): Promise<any> {
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
