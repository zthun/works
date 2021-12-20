import { Injectable } from '@nestjs/common';
import { IZLogin, IZUser, ZCookieBuilder } from '@zthun/works.core';
import { ZCookiesClient, ZUsersClient } from '@zthun/works.microservices';
import { Request, Response } from 'express';
import { get } from 'lodash';
import { ZCommonConfigService } from '../../config/common-config.service';
import { ZAuthConfigService } from '../config/auth-config.service';

@Injectable()
/**
 * Represents a service that can be used to sign, verify, inject and extract a jwt token.
 */
export class ZTokensService {
  /**
   * Initializes a new instance of this object.
   *
   * @param _users The user repository for retrieving and updating users.
   * @param _cookies The cookies client for retrieving cookies.
   * @param _commonConfig The common configuration service that contains core values.
   * @param _authConfig The auth configuration service that contains auth options.
   */
  public constructor(private readonly _users: ZUsersClient, private readonly _cookies: ZCookiesClient, private readonly _commonConfig: ZCommonConfigService, private readonly _authConfig: ZAuthConfigService) {}

  /**
   * Injects the jwt with the appropriate credentials into the response object.
   *
   * @param res The response object to inject the cookie into.
   * @param credentials The login credentials that contain the email to inject.
   *
   * @returns A promise that, when resolved, has injected the cookie.
   */
  public async inject(res: Response, credentials: IZLogin) {
    const user = await this._users.findByEmail(credentials.email);
    const { value: secret } = await this._authConfig.jwt();
    const { value: domain } = await this._commonConfig.domain();
    const cookie = await this._cookies.createAuthentication(user, secret, domain);
    await this._users.login(user._id);
    const expires = new Date(cookie.expires);
    res.cookie(cookie.name, cookie.value, { ...cookie, expires });
  }

  /**
   * Extracts a user from a request object.
   *
   * @param req The request to extract the user from.
   *
   * @returns A promise that, when resolved, has extracted the user.
   */
  public async extract(req: Request): Promise<IZUser> {
    const cookie = new ZCookieBuilder().authentication().build();
    const jwt = get(req, `cookies[${cookie.name}]`);
    const { value: secret } = await this._authConfig.jwt();
    const id = await this._cookies.whoIs(jwt, secret);
    return id == null ? null : this._users.findById(id);
  }

  /**
   * Clears the authentication cookie from the response.
   *
   * @param res The response to clear the cookie from.
   *
   * @returns A promise that, when resolved, has cleared the auth cookie.
   */
  public async clear(res: Response) {
    const { value: domain } = await this._commonConfig.domain();
    const cookie = new ZCookieBuilder().authentication().immortal().domain(domain).build();
    res.clearCookie(cookie.name, cookie);
  }
}
