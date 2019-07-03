import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { ZLoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    ZLoginFormComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    ZLoginFormComponent,
    HttpClientModule,
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
    library.add(faUser);
    library.add(faSignInAlt);
  }
}
