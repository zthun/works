import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ZAuthAppModule } from './auth-app/auth-app.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(ZAuthAppModule).catch((err) => console.log(err));
