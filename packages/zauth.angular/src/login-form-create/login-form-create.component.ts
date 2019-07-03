import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Represents the form data for creating a new account.
 */
@Component({
  selector: 'z-login-form-create',
  templateUrl: 'login-form-create.component.html'
})
export class ZLoginFormCreateComponent {
  @Output()
  public create = new EventEmitter<void>();
}
