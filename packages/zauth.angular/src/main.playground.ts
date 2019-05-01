import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PlaygroundModule } from 'angular-playground';
import { ZLoginImports } from './login.module';

PlaygroundModule
  .configure({
    selector: 'z-auth-angular-playground',
    overlay: false,
    modules: ZLoginImports.slice()
  });

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
