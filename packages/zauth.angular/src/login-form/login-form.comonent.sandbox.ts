import { sandboxOf } from 'angular-playground';
import { ZLoginFormComponent } from './login-form.component';

export default sandboxOf(ZLoginFormComponent).add('Basic view', {
  template: '<z-login-form></z-login-form>'
});
