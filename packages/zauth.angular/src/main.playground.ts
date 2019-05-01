import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlaygroundModule } from 'angular-playground';
import { ZLoginModule } from './login.module';

PlaygroundModule
  .configure({
    selector: 'z-auth-angular-playground',
    overlay: false,
    modules: [ZLoginModule]
  });

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
