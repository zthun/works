import { IZLogin } from './login.interface';

export class ZLoginBuilder {
  private _login: IZLogin;

  public constructor() {
    this._login = {
      email: null,
      password: null
    };
  }

  public email(val: string): ZLoginBuilder {
    this._login.email = val;
    return this;
  }

  public password(val: string): ZLoginBuilder {
    this._login.password = val;
    return this;
  }

  public confirm(val: string): ZLoginBuilder {
    this._login.confirm = val;
    return this;
  }

  public autoConfirm(): ZLoginBuilder {
    this._login.confirm = this._login.password;
    return this;
  }

  public login() {
    return { ...this._login };
  }
}
