import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { ZLoginFormCreateComponent } from './login-form-create/login-form-create.component';
import { ZLoginFormForgotComponent } from './login-form-forgot/login-form-forgot.component';
import { ZLoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    ZLoginFormComponent,
    ZLoginFormCreateComponent,
    ZLoginFormForgotComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ZLoginFormComponent,
    ZLoginFormCreateComponent,
    ZLoginFormForgotComponent,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class ZLoginModule {
  public constructor() {
    library.add(faQuestionCircle);
    library.add(faUser);
    library.add(faSignInAlt);
  }
}
