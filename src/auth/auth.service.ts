import { Injectable } from '@nestjs/common';
import * as OAuth2Server from 'oauth2-server';
import { AuthPasswordModel } from './auth-password.model';

@Injectable()
export class AuthService {
  private _oauth: OAuth2Server;

  public constructor() {
    this._oauth = new OAuth2Server({ model: new AuthPasswordModel() });
  }

  public async validate(token: string) {
    const req = new OAuth2Server.Request({
      method: 'GET',
      query: {},
      headers: { authorization: token }
    });
    const res = new OAuth2Server.Response();
    return await this._oauth.authenticate(req, res);
  }
}
