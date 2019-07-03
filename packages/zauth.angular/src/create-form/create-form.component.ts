import { Component, EventEmitter, Output } from '@angular/core';
import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';

/**
 * Represents the form data for a username and password box.
 */
@Component({
  selector: 'z-create-form',
  templateUrl: 'create-form.component.html'
})
export class ZCreateFormComponent {
  public login: IZLogin = new ZLoginBuilder().autoConfirm().build();

  /**
   * Occurs when the login object has changed.
   *
   * The input to this will be a new login object that
   * is a copy of this components login object.
   */
  @Output()
  public create = new EventEmitter<IZLogin>();

  /**
   * Publishes the login change event.
   */
  public publish() {
    const login = new ZLoginBuilder().copy(this.login).build();
    this.create.emit(login);
  }
}
