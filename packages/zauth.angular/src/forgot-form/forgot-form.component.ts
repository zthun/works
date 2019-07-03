import { Component, EventEmitter, Output } from '@angular/core';
import { IZLogin, ZLoginBuilder } from '@zthun/auth.core';

/**
 * Represents the form data for a username and password box.
 */
@Component({
  selector: 'z-forgot-form',
  templateUrl: 'forgot-form.component.html'
})
export class ZForgotFormComponent {
  public email = '';

  /**
   * Occurs when the user clicks the reset button.
   */
  @Output()
  public reset = new EventEmitter<string>();
}
