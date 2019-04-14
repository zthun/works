import { Token } from 'oauth2-server';
import { IZToken } from './token.interface';

export class ZTokenBuilder {
  private _token: IZToken;

  public constructor() {
    this._token = {
      _id: null,
      accessTokenExpiresAt: null,
      refreshToken: null,
      refreshTokenExpiresAt: null
    };
  }

  public id(val: string): ZTokenBuilder {
    this._token._id = val;
    return this;
  }

  public userId(val: string): ZTokenBuilder {
    this._token.userId = val;
    return this;
  }

  public accessTokenExpiresAt(val: Date | string) {
    this._token.accessTokenExpiresAt = new Date(val);
    return this;
  }

  public refreshToken(val: string): ZTokenBuilder {
    this._token.refreshToken = val;
    return this;
  }

  public refreshTokenExpiresAt(val: Date | string) {
    this._token.refreshTokenExpiresAt = new Date(val);
    return this;
  }

  public copyOauth(oToken: Token): ZTokenBuilder {
    return this.id(oToken.accessToken)
      .accessTokenExpiresAt(oToken.accessTokenExpiresAt)
      .refreshToken(oToken.refreshToken)
      .refreshTokenExpiresAt(oToken.refreshTokenExpiresAt)
      .userId(oToken.user._id);
  }

  public copy(other: IZToken): ZTokenBuilder {
    this._token = { ...other };
    return this;
  }

  public redact(): ZTokenBuilder {
    delete this._token.userId;
    delete this._token.refreshToken;
    delete this._token.refreshTokenExpiresAt;
    return this;
  }

  public token(): IZToken {
    return { ...this._token };
  }
}
