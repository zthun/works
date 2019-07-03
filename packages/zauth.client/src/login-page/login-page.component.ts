import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IZLogin } from '@zthun/auth.core';
import { ZCreateAccountPageUrl, ZForgotPageUrl } from '../auth-app/auth-app.routes';

/**
 * Represents the full login page.
 */
@Component({
  selector: 'z-login-page',
  templateUrl: 'login-page.component.html'
})
export class ZLoginPageComponent {
  public login: IZLogin = null;

  public constructor(private readonly _router: Router) { }

  public authenticate(login: IZLogin) {
    this.login = login;
  }

  public forgot() {
    this._router.navigate([ZForgotPageUrl]);
  }

  public create() {
    this._router.navigate([ZCreateAccountPageUrl]);
  }
}
