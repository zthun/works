import { IZToken } from './token.interface';

export class ZTokenBuilder {
  private _token: IZToken;

  public constructor() {
    this._token = {
      _id: null,
      exp: null
    };
  }

  public token(id: string): this {
    this._token._id = id;
    return this;
  }

  public expire(date: Date | string): this {
    this._token.exp = date;
    return this;
  }

  public user(id: string): this {
    this._token.userId = id;
    return this;
  }

  public redact(): this {
    delete this._token.userId;
    return this;
  }

  public copy(other: IZToken): this {
    this._token = { ...other };
    return this;
  }

  public build(): IZToken {
    return { ...this._token };
  }
}
