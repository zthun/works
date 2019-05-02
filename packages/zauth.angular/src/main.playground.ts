import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaygroundModule } from 'angular-playground';
import { ZLoginImports } from './login.module';

PlaygroundModule
  .configure({
    selector: 'z-auth-angular-playground',
    overlay: false,
    modules: ZLoginImports.concat([BrowserAnimationsModule])
  });

platformBrowserDynamic().bootstrapModule(PlaygroundModule);
