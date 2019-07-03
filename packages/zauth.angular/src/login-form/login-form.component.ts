import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';

/**
 * Represents the form data for a username and password box.
 */
@Component({
  selector: 'z-login-form',
  templateUrl: 'login-form.component.html'
})
export class ZLoginFormComponent {
  /**
   * Gets the login that this form is modifying.
   */
  public get login(): IZLogin {
    return this._login;
  }

  /**
   * Sets the login that this form is modifying.
   *
   * @param val The value to set.
   */
  @Input()
  public set login(val: IZLogin) {
    let builder = new ZLoginBuilder();
    builder = val ? builder.copy(val) : builder;
    this._login = builder.build();
  }

  /**
   * Occurs when the login object has changed.
   *
   * The input to this will be a new login object that
   * is a copy of this components login object.
   */
  @Output()
  public loginChange = new EventEmitter<IZLogin>();

  private _login: IZLogin = new ZLoginBuilder().build();

  /**
   * Publishes the login change event.
   */
  public publish() {
    const login = new ZLoginBuilder().copy(this._login).build();
    this.loginChange.emit(login);
  }
}
