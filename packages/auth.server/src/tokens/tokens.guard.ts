import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { get } from 'lodash';
import { ZOauthServerService } from '../oauth/oauth-server.service';

@Injectable()
export class ZTokensGuard implements CanActivate {
  public constructor(private _oauth: ZOauthServerService) { }

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    // Bearer token
    let token = null;

    if (request.headers.authorization) {
      token = request.headers.authorization;
    }

    if (!token && request.cookies.hasOwnProperty('access_token')) {
      token = get(request.cookies, 'access_token');
    }

    // await this._oauth.validate(token);
    return true;
  }
}
