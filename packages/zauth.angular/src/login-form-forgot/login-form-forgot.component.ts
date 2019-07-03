import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Represents the form data for resetting a forgotten password.
 */
@Component({
  selector: 'z-login-form-forgot',
  templateUrl: 'login-form-forgot.component.html'
})
export class ZLoginFormForgotComponent {
  @Output()
  public forgot = new EventEmitter<void>();
}
