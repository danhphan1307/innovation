/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import {ModuleWithProviders, NgModule, Provider} from '@angular/core';

import {SebmGoogleMap} from './directives/google-map';
import {SebmGoogleMapCircle} from './directives/google-map-circle';
import {SebmGoogleMapInfoWindow} from './directives/google-map-info-window';
import {SebmGoogleMapMarker} from './directives/google-map-marker';
import {SebmGoogleMapPolyline} from './directives/google-map-polyline';
import {SebmGoogleMapPolylinePoint} from './directives/google-map-polyline-point';
import {LazyMapsAPILoader} from './services/maps-api-loader/lazy-maps-api-loader';
import {LazyMapsAPILoaderConfigLiteral, provideLazyMapsAPILoaderConfig} from './services/maps-api-loader/lazy-maps-api-loader';
import {MapsAPILoader} from './services/maps-api-loader/maps-api-loader';
import {BROWSER_GLOBALS_PROVIDERS} from './utils/browser-globals';

const CORE_DIRECTIVES: any[] = [
  SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle,
  SebmGoogleMapPolyline, SebmGoogleMapPolylinePoint
];

/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
@NgModule({declarations: CORE_DIRECTIVES, exports: CORE_DIRECTIVES})
export class AgmCoreModule {
  /**
   * Please use this method when you register the module at the root level.
   */
  static forRoot(lazyMapsAPILoaderConfig?: LazyMapsAPILoaderConfigLiteral): ModuleWithProviders {
    const providers: Provider[] =
        [...BROWSER_GLOBALS_PROVIDERS, {provide: MapsAPILoader, useClass: LazyMapsAPILoader}];
    if (lazyMapsAPILoaderConfig) {
      providers.push(provideLazyMapsAPILoaderConfig(lazyMapsAPILoaderConfig));
    }
    return {
      ngModule: AgmCoreModule,
      providers: providers,
    };
  }
}
