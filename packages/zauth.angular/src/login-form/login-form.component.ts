import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';
import { ZLoginService } from '../login/login.service';

/**
 * Represents the form data for a username and password box.
 *
 * This is useful if you need a prebuilt login component
 * and don't want to build and style your own.  This
 * uses angular material.
 */
@Component({
  selector: 'z-login-form',
  templateUrl: 'login-form.component.html'
})
export class ZLoginFormComponent {
  /**
   * The redirection key.
   *
   * This is a white listed key of where to redirect the client
   * to when a login is successful.
   *
   * If this is not set, or there is no key that matches the login
   * credentials, then page will simply not redirect anywhere.
   * Generally, you will want this to match your client.
   */
  @Input()
  public redirect: string;

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
    this._login = builder.login();
  }

  /**
   * Occurs when the login object has changed.
   *
   * The input to this will be a new login object that
   * is a copy of this components login object.
   */
  @Output()
  public loginChange: EventEmitter<IZLogin>;

  private _login: IZLogin;

  /**
   * Initializes a new instance of this object.
   *
   * @param _service The service that can be used to run the auth workflow.
   */
  public constructor(private _service: ZLoginService) {
    this.login = new ZLoginBuilder().login();
    this.redirect = null;
    this.loginChange = new EventEmitter<IZLogin>();
  }

  /**
   * Sets the email piece of the login.
   *
   * This raises the login change event.
   *
   * @param val The value to set.
   */
  public email(val: string) {
    this.login.email = val;
    this.loginChange.emit(new ZLoginBuilder().copy(this.login).login());
  }

  /**
   * Sets the password of the login.
   *
   * @param val The value to set.
   */
  public password(val?: string) {
    this.login.password = val;
    this.loginChange.emit(new ZLoginBuilder().copy(this.login).login());
  }

  /**
   * Submits the login information to the server and redirects
   * to the page specified in the input.
   *
   * If there is no redirection, then a a simple success message
   * will be displayed, but will warn the user that it could
   * not redirect them back to the previous page.
   */
  public submit() {
    return undefined;
  }
}
