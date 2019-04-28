import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZLoginFormComponent } from './login-form/login-form.component';

@NgModule({
    declarations: [
        ZLoginFormComponent
    ],
    imports: [
        FormsModule
    ],
    exports: [
        FormsModule,
        ZLoginFormComponent
    ]
})
export class ZLoginModule { }
