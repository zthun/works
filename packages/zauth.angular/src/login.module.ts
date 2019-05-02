import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { ZLoginFormComponent } from './login-form/login-form.component';

export const ZLoginDeclarations: any[] = [
  ZLoginFormComponent
];

export const ZLoginImports: any[] = [
  HttpClientModule,
  CommonModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  FormsModule
];

@NgModule({
  declarations: ZLoginDeclarations.slice(),
  imports: ZLoginImports.slice(),
  exports: ZLoginImports.concat(ZLoginDeclarations)
})
export class ZLoginModule { }
