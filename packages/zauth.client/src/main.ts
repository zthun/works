(window as any).global = window;
/* IE9, IE10 and IE11 requires all of the following polyfills. */
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
import 'core-js/es/array';
import 'core-js/es/date';
import 'core-js/es/function';
import 'core-js/es/map';
import 'core-js/es/math';
import 'core-js/es/number';
import 'core-js/es/object';
import 'core-js/es/parse-float';
import 'core-js/es/parse-int';
import 'core-js/es/reflect';
import 'core-js/es/regexp';
import 'core-js/es/set';
import 'core-js/es/string';
import 'core-js/es/symbol';
import 'core-js/es/weak-map';
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone'; // Included with Angular CLI.
import { ZAuthAppModule } from './auth-app/auth-app.module';

/* Evergreen browsers require these. */
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
// import 'core-js/stage/reflect';

/*
* in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
* with the following flag, it will bypass `zone.js` patch for IE/Edge
*/
(window as any).__Zone_enable_cross_context_check = true;

/***************************************
 * Root application logic.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
const logger = console;
enableProdMode();
platformBrowserDynamic().bootstrapModule(ZAuthAppModule).catch((err) => logger.log(err));
