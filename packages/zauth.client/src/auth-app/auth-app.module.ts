import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZLoginModule } from '@zthun/auth.angular';
import { ZAuthAppComponent } from './auth-app.component';

@NgModule({
  declarations: [
    ZAuthAppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ZLoginModule,
  ],
  bootstrap: [ZAuthAppComponent]
})
export class ZAuthAppModule { }
