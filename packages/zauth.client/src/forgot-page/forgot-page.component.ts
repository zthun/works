import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZLoginPageUrl } from '../auth-app/auth-app.routes';

@Component({
  selector: 'z-forgot-page',
  templateUrl: 'forgot-page.component.html'
})
export class ZForgotPageComponent {
  public constructor(private readonly _router: Router) { }

  public reset(email: string) {
    return undefined;
  }

  public cancel() {
    this._router.navigate([ZLoginPageUrl]);
  }
}
