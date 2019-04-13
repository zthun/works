import { IZOAuthParams } from './oauth-params.interface';

export class ZOAuthParamsBuilder {
  private _oauthParams: IZOAuthParams;

  public constructor() {
    this._oauthParams = {
      grant_type: 'password',
      client_id: 'zauth.services',
      client_secret: 'none',
      username: null,
      password: null
    };
  }

  public username(val: string): ZOAuthParamsBuilder {
    this._oauthParams.username = val;
    return this;
  }

  public password(val: string): ZOAuthParamsBuilder {
    this._oauthParams.password = val;
    return this;
  }

  public params() {
    return { ...this._oauthParams };
  }
}
