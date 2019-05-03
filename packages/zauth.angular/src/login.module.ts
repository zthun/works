import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
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
    FormsModule
  ],
  exports: [
    ZLoginFormComponent,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ]
})
export class ZLoginModule { }
