/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { SebmGoogleMap } from './directives/google-map';
import { SebmGoogleMapCircle } from './directives/google-map-circle';
import { SebmGoogleMapInfoWindow } from './directives/google-map-info-window';
import { SebmGoogleMapMarker } from './directives/google-map-marker';
import { SebmGoogleMapPolyline } from './directives/google-map-polyline';
import { SebmGoogleMapPolylinePoint } from './directives/google-map-polyline-point';
import { LazyMapsAPILoader } from './services/maps-api-loader/lazy-maps-api-loader';
import { provideLazyMapsAPILoaderConfig } from './services/maps-api-loader/lazy-maps-api-loader';
import { MapsAPILoader } from './services/maps-api-loader/maps-api-loader';
import { BROWSER_GLOBALS_PROVIDERS } from './utils/browser-globals';
const CORE_DIRECTIVES = [
    SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle,
    SebmGoogleMapPolyline, SebmGoogleMapPolylinePoint
];
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
let AgmCoreModule_1;
export let AgmCoreModule = AgmCoreModule_1 = class AgmCoreModule {
    /**
     * Please use this method when you register the module at the root level.
     */
    static forRoot(lazyMapsAPILoaderConfig) {
        const providers = [...BROWSER_GLOBALS_PROVIDERS, { provide: MapsAPILoader, useClass: LazyMapsAPILoader }];
        if (lazyMapsAPILoaderConfig) {
            providers.push(provideLazyMapsAPILoaderConfig(lazyMapsAPILoaderConfig));
        }
        return {
            ngModule: AgmCoreModule_1,
            providers: providers,
        };
    }
};
AgmCoreModule = AgmCoreModule_1 = __decorate([
    NgModule({ declarations: CORE_DIRECTIVES, exports: CORE_DIRECTIVES }), 
    __metadata('design:paramtypes', [])
], AgmCoreModule);

//# sourceMappingURL=core-module.js.map
