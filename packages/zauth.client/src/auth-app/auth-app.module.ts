import { NgModule } from '@angular/core';
import { ZLoginModule } from '@zthun/auth.angular';
import { ZAuthAppComponent } from './auth-app.component';

@NgModule({
  declarations: [
    ZAuthAppComponent
  ],
  imports: [
    ZLoginModule,
  ],
  bootstrap: [ZAuthAppComponent]
})
export class ZAuthAppModule { }
