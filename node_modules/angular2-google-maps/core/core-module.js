/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var google_map_1 = require('./directives/google-map');
var google_map_circle_1 = require('./directives/google-map-circle');
var google_map_info_window_1 = require('./directives/google-map-info-window');
var google_map_marker_1 = require('./directives/google-map-marker');
var google_map_polyline_1 = require('./directives/google-map-polyline');
var google_map_polyline_point_1 = require('./directives/google-map-polyline-point');
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
var lazy_maps_api_loader_2 = require('./services/maps-api-loader/lazy-maps-api-loader');
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
var browser_globals_1 = require('./utils/browser-globals');
var CORE_DIRECTIVES = [
    google_map_1.SebmGoogleMap, google_map_marker_1.SebmGoogleMapMarker, google_map_info_window_1.SebmGoogleMapInfoWindow, google_map_circle_1.SebmGoogleMapCircle,
    google_map_polyline_1.SebmGoogleMapPolyline, google_map_polyline_point_1.SebmGoogleMapPolylinePoint
];
/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = (function () {
    function AgmCoreModule() {
    }
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        var providers = browser_globals_1.BROWSER_GLOBALS_PROVIDERS.concat([{ provide: maps_api_loader_1.MapsAPILoader, useClass: lazy_maps_api_loader_1.LazyMapsAPILoader }]);
        if (lazyMapsAPILoaderConfig) {
            providers.push(lazy_maps_api_loader_2.provideLazyMapsAPILoaderConfig(lazyMapsAPILoaderConfig));
        }
        return {
            ngModule: AgmCoreModule,
            providers: providers,
        };
    };
    AgmCoreModule = __decorate([
        core_1.NgModule({ declarations: CORE_DIRECTIVES, exports: CORE_DIRECTIVES }), 
        __metadata('design:paramtypes', [])
    ], AgmCoreModule);
    return AgmCoreModule;
}());
exports.AgmCoreModule = AgmCoreModule;

//# sourceMappingURL=core-module.js.map
