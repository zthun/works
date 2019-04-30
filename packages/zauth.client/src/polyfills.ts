(window as any).global = window;

/***************************************************************/
/* IE9, IE10 and IE11 requires all of the following polyfills. */
/***************************************************************/
import 'core-js/es6/array';
import 'core-js/es6/date';
import 'core-js/es6/function';
import 'core-js/es6/map';
import 'core-js/es6/math';
import 'core-js/es6/number';
import 'core-js/es6/object';
import 'core-js/es6/parse-float';
import 'core-js/es6/parse-int';
import 'core-js/es6/reflect';
import 'core-js/es6/regexp';
import 'core-js/es6/set';
import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'core-js/es6/weak-map';
/***************************************************************************************************/
/* Zone JS is required by default for Angular itself.
/***************************************************************************************************/
import 'zone.js/dist/zone'; // Included with Angular CLI.

/* Evergreen browsers require these. */
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect';

/*
* in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
* with the following flag, it will bypass `zone.js` patch for IE/Edge
*/
(window as any).__Zone_enable_cross_context_check = true;
