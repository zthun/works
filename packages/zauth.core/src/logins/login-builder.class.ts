import { IZLogin } from './login.interface';

export class ZLoginBuilder {
  private _login: IZLogin;

  public constructor() {
    this._login = {
      email: null,
      password: null
    };
  }

  public from(other: IZLogin): ZLoginBuilder {
    this._login.email = other.email;
    this._login.password = other.password;
    this._login.confirm = other.confirm;
    return this;
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
    return this.confirm(this._login.password);
  }

  public login() {
    return { ...this._login };
  }
}
