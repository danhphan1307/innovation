/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
"use strict";
var google_maps_api_wrapper_1 = require('./services/google-maps-api-wrapper');
exports.GoogleMapsAPIWrapper = google_maps_api_wrapper_1.GoogleMapsAPIWrapper;
var circle_manager_1 = require('./services/managers/circle-manager');
exports.CircleManager = circle_manager_1.CircleManager;
var info_window_manager_1 = require('./services/managers/info-window-manager');
exports.InfoWindowManager = info_window_manager_1.InfoWindowManager;
var marker_manager_1 = require('./services/managers/marker-manager');
exports.MarkerManager = marker_manager_1.MarkerManager;
var polyline_manager_1 = require('./services/managers/polyline-manager');
exports.PolylineManager = polyline_manager_1.PolylineManager;
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
exports.GoogleMapsScriptProtocol = lazy_maps_api_loader_1.GoogleMapsScriptProtocol;
exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
exports.LazyMapsAPILoaderConfig = lazy_maps_api_loader_1.LazyMapsAPILoaderConfig;
exports.provideLazyMapsAPILoaderConfig = lazy_maps_api_loader_1.provideLazyMapsAPILoaderConfig;
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
var noop_maps_api_loader_1 = require('./services/maps-api-loader/noop-maps-api-loader');
exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;

//# sourceMappingURL=services.js.map
