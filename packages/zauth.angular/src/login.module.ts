import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey, faQuestionCircle, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { ZCreateFormComponent } from './create-form/create-form.component';
import { ZForgotFormComponent } from './forgot-form/forgot-form.component';
import { ZLoginFormCreateComponent } from './login-form-create/login-form-create.component';
import { ZLoginFormForgotComponent } from './login-form-forgot/login-form-forgot.component';
import { ZLoginFormComponent } from './login-form/login-form.component';
import { ZProfileTopbarComponent } from './profile-topbar/profile-topbar.component';

@NgModule({
  declarations: [
    ZLoginFormComponent,
    ZLoginFormCreateComponent,
    ZLoginFormForgotComponent,
    ZCreateFormComponent,
    ZForgotFormComponent,
    ZProfileTopbarComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ZLoginFormComponent,
    ZLoginFormCreateComponent,
    ZLoginFormForgotComponent,
    ZCreateFormComponent,
    ZForgotFormComponent,
    ZProfileTopbarComponent,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class ZLoginModule {
  public constructor() {
    library.add(faKey);
    library.add(faQuestionCircle);
    library.add(faUser);
    library.add(faSignInAlt);
  }
}
