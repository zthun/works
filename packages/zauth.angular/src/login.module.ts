import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { ZLoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    ZLoginFormComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    ZLoginFormComponent
  ]
})
export class ZLoginModule { }
