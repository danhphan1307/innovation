/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import { OpaqueToken } from '@angular/core';
export const WINDOW_GLOBAL = new OpaqueToken('angular2-google-maps window_global');
export const DOCUMENT_GLOBAL = new OpaqueToken('angular2-google-maps document_global');
export const BROWSER_GLOBALS_PROVIDERS = [{ provide: WINDOW_GLOBAL, useValue: window }, { provide: DOCUMENT_GLOBAL, useValue: document }];

//# sourceMappingURL=browser-globals.js.map
