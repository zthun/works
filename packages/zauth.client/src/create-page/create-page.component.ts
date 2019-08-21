import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IZLogin } from '@zthun/auth.core';
import { ZLoginPageUrl } from '../auth-app/auth-app.routes';

@Component({
  selector: 'z-create-page',
  templateUrl: 'create-page.component.html'
})
export class ZCreatePageComponent {
  public constructor(private readonly _router: Router) { }

  public create(login: IZLogin) {
    return undefined;
  }

  public cancel() {
    this._router.navigate([ZLoginPageUrl]);
  }
}
