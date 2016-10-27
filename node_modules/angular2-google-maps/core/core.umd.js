var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Observable')) :
        typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable'], factory) :
            (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.core = global.ngmaps.core || {}), global.ng.core, global.Rx));
}(this, (function (exports, _angular_core, rxjs_Observable) {
    'use strict';
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    exports.MapsAPILoader = (function () {
        function MapsAPILoader() {
        }
        return MapsAPILoader;
    }());
    exports.MapsAPILoader = __decorate$2([
        _angular_core.Injectable(),
        __metadata$2('design:paramtypes', [])
    ], exports.MapsAPILoader);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    /**
     * Wrapper class that handles the communication with the Google Maps Javascript
     * API v3
     */
    exports.GoogleMapsAPIWrapper = (function () {
        function GoogleMapsAPIWrapper(_loader, _zone) {
            var _this = this;
            this._loader = _loader;
            this._zone = _zone;
            this._map =
                new Promise(function (resolve) { _this._mapResolver = resolve; });
        }
        GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
            var _this = this;
            return this._loader.load().then(function () {
                var map = new google.maps.Map(el, mapOptions);
                _this._mapResolver(map);
                return;
            });
        };
        GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
            this._map.then(function (m) { m.setOptions(options); });
        };
        /**
         * Creates a google map marker with the map context
         */
        GoogleMapsAPIWrapper.prototype.createMarker = function (options) {
            if (options === void 0) { options = {}; }
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Marker(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
            return this._map.then(function () { return new google.maps.InfoWindow(options); });
        };
        /**
         * Creates a google.map.Circle for the current map.
         */
        GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
            return this._map.then(function (map) {
                options.map = map;
                return new google.maps.Circle(options);
            });
        };
        GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
            return this.getNativeMap().then(function (map) {
                var line = new google.maps.Polyline(options);
                line.setMap(map);
                return line;
            });
        };
        GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
            var _this = this;
            return rxjs_Observable.Observable.create(function (observer) {
                _this._map.then(function (m) {
                    m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
                });
            });
        };
        GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
            return this._map.then(function (map) { return map.setCenter(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getZoom(); }); };
        GoogleMapsAPIWrapper.prototype.getBounds = function () {
            return this._map.then(function (map) { return map.getBounds(); });
        };
        GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
            return this._map.then(function (map) { return map.setZoom(zoom); });
        };
        GoogleMapsAPIWrapper.prototype.getCenter = function () {
            return this._map.then(function (map) { return map.getCenter(); });
        };
        GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
            return this._map.then(function (map) { return map.panTo(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
            return this._map.then(function (map) { return map.fitBounds(latLng); });
        };
        GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
            return this._map.then(function (map) { return map.panToBounds(latLng); });
        };
        /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         */
        GoogleMapsAPIWrapper.prototype.getNativeMap = function () { return this._map; };
        /**
         * Triggers the given event name on the map instance.
         */
        GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
            return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
        };
        return GoogleMapsAPIWrapper;
    }());
    exports.GoogleMapsAPIWrapper = __decorate$1([
        _angular_core.Injectable(),
        __metadata$1('design:paramtypes', [exports.MapsAPILoader, _angular_core.NgZone])
    ], exports.GoogleMapsAPIWrapper);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    exports.CircleManager = (function () {
        function CircleManager(_apiWrapper, _zone) {
            this._apiWrapper = _apiWrapper;
            this._zone = _zone;
            this._circles = new Map();
        }
        CircleManager.prototype.addCircle = function (circle) {
            this._circles.set(circle, this._apiWrapper.createCircle({
                center: { lat: circle.latitude, lng: circle.longitude },
                clickable: circle.clickable,
                draggable: circle.draggable,
                editable: circle.editable,
                fillColor: circle.fillColor,
                fillOpacity: circle.fillOpacity,
                radius: circle.radius,
                strokeColor: circle.strokeColor,
                strokeOpacity: circle.strokeOpacity,
                strokePosition: circle.strokePosition,
                strokeWeight: circle.strokeWeight,
                visible: circle.visible,
                zIndex: circle.zIndex
            }));
        };
        ;
        /**
         * Removes the given circle from the map.
         */
        CircleManager.prototype.removeCircle = function (circle) {
            var _this = this;
            return this._circles.get(circle).then(function (c) {
                c.setMap(null);
                _this._circles.delete(circle);
            });
        };
        CircleManager.prototype.setOptions = function (circle, options) {
            return this._circles.get(circle).then(function (c) { return c.setOptions(options); });
        };
        ;
        CircleManager.prototype.getBounds = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.getBounds(); });
        };
        ;
        CircleManager.prototype.getCenter = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.getCenter(); });
        };
        ;
        CircleManager.prototype.getRadius = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.getRadius(); });
        };
        CircleManager.prototype.setCenter = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
        };
        ;
        CircleManager.prototype.setEditable = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
        };
        ;
        CircleManager.prototype.setDraggable = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
        };
        ;
        CircleManager.prototype.setVisible = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
        };
        ;
        CircleManager.prototype.setRadius = function (circle) {
            return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
        };
        ;
        CircleManager.prototype.createEventObservable = function (eventName, circle) {
            var _this = this;
            return rxjs_Observable.Observable.create(function (observer) {
                var listener = null;
                _this._circles.get(circle).then(function (c) {
                    listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
                return function () {
                    if (listener !== null) {
                        listener.remove();
                    }
                };
            });
        };
        return CircleManager;
    }());
    exports.CircleManager = __decorate$3([
        _angular_core.Injectable(),
        __metadata$3('design:paramtypes', [exports.GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], exports.CircleManager);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$5 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    exports.MarkerManager = (function () {
        function MarkerManager(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markers = new Map();
        }
        MarkerManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            var m = this._markers.get(marker);
            if (m == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return m.then(function (m) {
                return _this._zone.run(function () {
                    m.setMap(null);
                    _this._markers.delete(marker);
                });
            });
        };
        MarkerManager.prototype.updateMarkerPosition = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
        };
        MarkerManager.prototype.updateTitle = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
        };
        MarkerManager.prototype.updateLabel = function (marker) {
            return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
        };
        MarkerManager.prototype.updateDraggable = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
        };
        MarkerManager.prototype.updateIcon = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
        };
        MarkerManager.prototype.updateOpacity = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
        };
        MarkerManager.prototype.updateVisible = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
        };
        MarkerManager.prototype.updateZIndex = function (marker) {
            return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
        };
        MarkerManager.prototype.addMarker = function (marker) {
            var markerPromise = this._mapsWrapper.createMarker({
                position: { lat: marker.latitude, lng: marker.longitude },
                label: marker.label,
                draggable: marker.draggable,
                icon: marker.iconUrl,
                opacity: marker.opacity,
                visible: marker.visible,
                zIndex: marker.zIndex,
                title: marker.title
            });
            this._markers.set(marker, markerPromise);
        };
        MarkerManager.prototype.getNativeMarker = function (marker) {
            return this._markers.get(marker);
        };
        MarkerManager.prototype.createEventObservable = function (eventName, marker) {
            var _this = this;
            return rxjs_Observable.Observable.create(function (observer) {
                _this._markers.get(marker).then(function (m) {
                    m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        return MarkerManager;
    }());
    exports.MarkerManager = __decorate$5([
        _angular_core.Injectable(),
        __metadata$5('design:paramtypes', [exports.GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], exports.MarkerManager);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    exports.InfoWindowManager = (function () {
        function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markerManager = _markerManager;
            this._infoWindows = new Map();
        }
        InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
            var _this = this;
            var iWindow = this._infoWindows.get(infoWindow);
            if (iWindow == null) {
                // info window already deleted
                return Promise.resolve();
            }
            return iWindow.then(function (i) {
                return _this._zone.run(function () {
                    i.close();
                    _this._infoWindows.delete(infoWindow);
                });
            });
        };
        InfoWindowManager.prototype.setPosition = function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
                lat: infoWindow.latitude,
                lng: infoWindow.longitude
            }); });
        };
        InfoWindowManager.prototype.setZIndex = function (infoWindow) {
            return this._infoWindows.get(infoWindow)
                .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
        };
        InfoWindowManager.prototype.open = function (infoWindow) {
            var _this = this;
            return this._infoWindows.get(infoWindow).then(function (w) {
                if (infoWindow.hostMarker != null) {
                    return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                        return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                    });
                }
                return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
            });
        };
        InfoWindowManager.prototype.close = function (infoWindow) {
            return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
        };
        InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
            return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
        };
        InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
            var options = {
                content: infoWindow.content,
                maxWidth: infoWindow.maxWidth,
                zIndex: infoWindow.zIndex,
            };
            if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
                options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
            }
            var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
            this._infoWindows.set(infoWindow, infoWindowPromise);
        };
        return InfoWindowManager;
    }());
    exports.InfoWindowManager = __decorate$4([
        _angular_core.Injectable(),
        __metadata$4('design:paramtypes', [exports.GoogleMapsAPIWrapper, _angular_core.NgZone, exports.MarkerManager])
    ], exports.InfoWindowManager);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$6 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var PolylineManager_1;
    exports.PolylineManager = PolylineManager_1 = (function () {
        function PolylineManager(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._polylines = new Map();
        }
        PolylineManager._convertPoints = function (line) {
            var path = line._getPoints().map(function (point) {
                return { lat: point.latitude, lng: point.longitude };
            });
            return path;
        };
        PolylineManager.prototype.addPolyline = function (line) {
            var path = PolylineManager_1._convertPoints(line);
            var polylinePromise = this._mapsWrapper.createPolyline({
                clickable: line.clickable,
                draggable: line.draggable,
                editable: line.editable,
                geodesic: line.geodesic,
                strokeColor: line.strokeColor,
                strokeOpacity: line.strokeOpacity,
                strokeWeight: line.strokeWeight,
                visible: line.visible,
                zIndex: line.zIndex,
                path: path
            });
            this._polylines.set(line, polylinePromise);
        };
        PolylineManager.prototype.updatePolylinePoints = function (line) {
            var _this = this;
            var path = PolylineManager_1._convertPoints(line);
            var m = this._polylines.get(line);
            if (m == null) {
                return Promise.resolve();
            }
            return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
        };
        PolylineManager.prototype.setPolylineOptions = function (line, options) {
            return this._polylines.get(line).then(function (l) { l.setOptions(options); });
        };
        PolylineManager.prototype.deletePolyline = function (line) {
            var _this = this;
            var m = this._polylines.get(line);
            if (m == null) {
                return Promise.resolve();
            }
            return m.then(function (l) {
                return _this._zone.run(function () {
                    l.setMap(null);
                    _this._polylines.delete(line);
                });
            });
        };
        PolylineManager.prototype.createEventObservable = function (eventName, line) {
            var _this = this;
            return rxjs_Observable.Observable.create(function (observer) {
                _this._polylines.get(line).then(function (l) {
                    l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
                });
            });
        };
        return PolylineManager;
    }());
    exports.PolylineManager = PolylineManager_1 = __decorate$6([
        _angular_core.Injectable(),
        __metadata$6('design:paramtypes', [exports.GoogleMapsAPIWrapper, _angular_core.NgZone])
    ], exports.PolylineManager);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    /**
     * SebMGoogleMap renders a Google Map.
     * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
     * class `sebm-google-map-container`.
     *
     * ### Example
     * ```typescript
     * import {Component} from '@angular/core';
     * import {SebmGoogleMap} from 'angular2-google-maps/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  directives: [SebmGoogleMap],
     *  styles: [`
     *    .sebm-google-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *    </sebm-google-map>
     *  `
     * })
     * ```
     */
    var SebmGoogleMap_1;
    exports.SebmGoogleMap = SebmGoogleMap_1 = (function () {
        function SebmGoogleMap(_elem, _mapsWrapper) {
            this._elem = _elem;
            this._mapsWrapper = _mapsWrapper;
            /**
             * The longitude that defines the center of the map.
             */
            this.longitude = 0;
            /**
             * The latitude that defines the center of the map.
             */
            this.latitude = 0;
            /**
             * The zoom level of the map. The default zoom level is 8.
             */
            this.zoom = 8;
            /**
             * Enables/disables if map is draggable.
             */
            this.draggable = true;
            /**
             * Enables/disables zoom and center on double click. Enabled by default.
             */
            this.disableDoubleClickZoom = false;
            /**
             * Enables/disables all default UI of the Google map. Please note: When the map is created, this
             * value cannot get updated.
             */
            this.disableDefaultUI = false;
            /**
             * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
             */
            this.scrollwheel = true;
            /**
             * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
             * enabled by default.
             */
            this.keyboardShortcuts = true;
            /**
             * The enabled/disabled state of the Zoom control.
             */
            this.zoomControl = true;
            /**
             * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
             * modes, these styles will only apply to labels and geometry.
             */
            this.styles = [];
            /**
             * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
             * used to
             * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
             */
            this.usePanning = false;
            /**
             * The initial enabled/disabled state of the Street View Pegman control.
             * This control is part of the default UI, and should be set to false when displaying a map type
             * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
             */
            this.streetViewControl = true;
            /**
             * Sets the viewport to contain the given bounds.
             */
            this.fitBounds = null;
            /**
             * The initial enabled/disabled state of the Scale control. This is disabled by default.
             */
            this.scaleControl = false;
            /**
             * The initial enabled/disabled state of the Map type control.
             */
            this.mapTypeControl = false;
            this._observableSubscriptions = [];
            /**
             * This event emitter gets emitted when the user clicks on the map (but not when they click on a
             * marker or infoWindow).
             */
            this.mapClick = new _angular_core.EventEmitter();
            /**
             * This event emitter gets emitted when the user right-clicks on the map (but not when they click
             * on a marker or infoWindow).
             */
            this.mapRightClick = new _angular_core.EventEmitter();
            /**
             * This event emitter gets emitted when the user double-clicks on the map (but not when they click
             * on a marker or infoWindow).
             */
            this.mapDblClick = new _angular_core.EventEmitter();
            /**
             * This event emitter is fired when the map center changes.
             */
            this.centerChange = new _angular_core.EventEmitter();
            /**
             * This event is fired when the viewport bounds have changed.
             */
            this.boundsChange = new _angular_core.EventEmitter();
            /**
             * This event is fired when the map becomes idle after panning or zooming.
             */
            this.idle = new _angular_core.EventEmitter();
            /**
             * This event is fired when the zoom level has changed.
             */
            this.zoomChange = new _angular_core.EventEmitter();
        }
        /** @internal */
        SebmGoogleMap.prototype.ngOnInit = function () {
            // todo: this should be solved with a new component and a viewChild decorator
            var container = this._elem.nativeElement.querySelector('.sebm-google-map-container-inner');
            this._initMapInstance(container);
        };
        SebmGoogleMap.prototype._initMapInstance = function (el) {
            this._mapsWrapper.createMap(el, {
                center: { lat: this.latitude || 0, lng: this.longitude || 0 },
                zoom: this.zoom,
                disableDefaultUI: this.disableDefaultUI,
                backgroundColor: this.backgroundColor,
                draggable: this.draggable,
                draggableCursor: this.draggableCursor,
                draggingCursor: this.draggingCursor,
                keyboardShortcuts: this.keyboardShortcuts,
                zoomControl: this.zoomControl,
                styles: this.styles,
                streetViewControl: this.streetViewControl,
                scaleControl: this.scaleControl,
                mapTypeControl: this.mapTypeControl
            });
            // register event listeners
            this._handleMapCenterChange();
            this._handleMapZoomChange();
            this._handleMapMouseEvents();
            this._handleBoundsChange();
            this._handleIdleEvent();
        };
        /** @internal */
        SebmGoogleMap.prototype.ngOnDestroy = function () {
            // unsubscribe all registered observable subscriptions
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        /* @internal */
        SebmGoogleMap.prototype.ngOnChanges = function (changes) {
            this._updateMapOptionsChanges(changes);
            this._updatePosition(changes);
        };
        SebmGoogleMap.prototype._updateMapOptionsChanges = function (changes) {
            var options = {};
            var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMap_1._mapOptionsAttributes.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
            this._mapsWrapper.setMapOptions(options);
        };
        /**
         * Triggers a resize event on the google map instance.
         * Returns a promise that gets resolved after the event was triggered.
         */
        SebmGoogleMap.prototype.triggerResize = function () {
            var _this = this;
            // Note: When we would trigger the resize event and show the map in the same turn (which is a
            // common case for triggering a resize event), then the resize event would not
            // work (to show the map), so we trigger the event in a timeout.
            return new Promise(function (resolve) {
                setTimeout(function () { return _this._mapsWrapper.triggerMapEvent('resize').then(function () { return resolve(); }); });
            });
        };
        SebmGoogleMap.prototype._updatePosition = function (changes) {
            if (changes['latitude'] == null && changes['longitude'] == null &&
                changes['fitBounds'] == null) {
                // no position update needed
                return;
            }
            // we prefer fitBounds in changes
            if (changes['fitBounds'] && this.fitBounds != null) {
                this._fitBounds();
                return;
            }
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            var newCenter = {
                lat: this.latitude,
                lng: this.longitude,
            };
            if (this.usePanning) {
                this._mapsWrapper.panTo(newCenter);
            }
            else {
                this._mapsWrapper.setCenter(newCenter);
            }
        };
        SebmGoogleMap.prototype._fitBounds = function () {
            if (this.usePanning) {
                this._mapsWrapper.panToBounds(this.fitBounds);
                return;
            }
            this._mapsWrapper.fitBounds(this.fitBounds);
        };
        SebmGoogleMap.prototype._handleMapCenterChange = function () {
            var _this = this;
            var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
                _this._mapsWrapper.getCenter().then(function (center) {
                    _this.latitude = center.lat();
                    _this.longitude = center.lng();
                    _this.centerChange.emit({ lat: _this.latitude, lng: _this.longitude });
                });
            });
            this._observableSubscriptions.push(s);
        };
        SebmGoogleMap.prototype._handleBoundsChange = function () {
            var _this = this;
            var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
                _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
            });
            this._observableSubscriptions.push(s);
        };
        SebmGoogleMap.prototype._handleMapZoomChange = function () {
            var _this = this;
            var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
                _this._mapsWrapper.getZoom().then(function (z) {
                    _this.zoom = z;
                    _this.zoomChange.emit(z);
                });
            });
            this._observableSubscriptions.push(s);
        };
        SebmGoogleMap.prototype._handleIdleEvent = function () {
            var _this = this;
            var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
            this._observableSubscriptions.push(s);
        };
        SebmGoogleMap.prototype._handleMapMouseEvents = function () {
            var _this = this;
            var events = [
                { name: 'click', emitter: this.mapClick },
                { name: 'rightclick', emitter: this.mapRightClick },
            ];
            events.forEach(function (e) {
                var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                    var value = { coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
                    e.emitter.emit(value);
                });
                _this._observableSubscriptions.push(s);
            });
        };
        return SebmGoogleMap;
    }());
    /**
     * Map option attributes that can change over time
     */
    exports.SebmGoogleMap._mapOptionsAttributes = [
        'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
        'keyboardShortcuts', 'zoomControl', 'styles', 'streetViewControl', 'zoom', 'mapTypeControl'
    ];
    exports.SebmGoogleMap = SebmGoogleMap_1 = __decorate([
        _angular_core.Component({
            selector: 'sebm-google-map',
            providers: [exports.GoogleMapsAPIWrapper, exports.MarkerManager, exports.InfoWindowManager, exports.CircleManager, exports.PolylineManager],
            inputs: [
                'longitude', 'latitude', 'zoom', 'draggable: mapDraggable', 'disableDoubleClickZoom',
                'disableDefaultUI', 'scrollwheel', 'backgroundColor', 'draggableCursor', 'draggingCursor',
                'keyboardShortcuts', 'zoomControl', 'styles', 'usePanning', 'streetViewControl', 'fitBounds',
                'scaleControl', 'mapTypeControl'
            ],
            outputs: [
                'mapClick', 'mapRightClick', 'mapDblClick', 'centerChange', 'idle', 'boundsChange', 'zoomChange'
            ],
            host: { '[class.sebm-google-map-container]': 'true' },
            styles: ["\n    .sebm-google-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .sebm-google-map-content {\n      display:none;\n    }\n  "],
            template: "\n    <div class='sebm-google-map-container-inner'></div>\n    <div class='sebm-google-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata('design:paramtypes', [_angular_core.ElementRef, exports.GoogleMapsAPIWrapper])
    ], exports.SebmGoogleMap);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$7 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var SebmGoogleMapCircle_1;
    exports.SebmGoogleMapCircle = SebmGoogleMapCircle_1 = (function () {
        function SebmGoogleMapCircle(_manager) {
            this._manager = _manager;
            /**
             * Indicates whether this Circle handles mouse events. Defaults to true.
             */
            this.clickable = true;
            /**
             * If set to true, the user can drag this circle over the map. Defaults to false.
             */
            this.draggable = false;
            /**
             * If set to true, the user can edit this circle by dragging the control points shown at
             * the center and around the circumference of the circle. Defaults to false.
             */
            this.editable = false;
            /**
             * The radius in meters on the Earth's surface.
             */
            this.radius = 0;
            /**
             * The stroke position. Defaults to CENTER.
             * This property is not supported on Internet Explorer 8 and earlier.
             */
            this.strokePosition = 'CENTER';
            /**
             * The stroke width in pixels.
             */
            this.strokeWeight = 0;
            /**
             * Whether this circle is visible on the map. Defaults to true.
             */
            this.visible = true;
            /**
             * This event is fired when the circle's center is changed.
             */
            this.centerChange = new _angular_core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the circle.
             */
            this.circleClick = new _angular_core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the circle.
             */
            this.circleDblClick = new _angular_core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the circle.
             */
            this.drag = new _angular_core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the circle.
             */
            this.dragEnd = new _angular_core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the circle.
             */
            this.dragStart = new _angular_core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the circle.
             */
            this.mouseDown = new _angular_core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the circle.
             */
            this.mouseMove = new _angular_core.EventEmitter();
            /**
             * This event is fired on circle mouseout.
             */
            this.mouseOut = new _angular_core.EventEmitter();
            /**
             * This event is fired on circle mouseover.
             */
            this.mouseOver = new _angular_core.EventEmitter();
            /**
             * This event is fired when the DOM mouseup event is fired on the circle.
             */
            this.mouseUp = new _angular_core.EventEmitter();
            /**
             * This event is fired when the circle's radius is changed.
             */
            this.radiusChange = new _angular_core.EventEmitter();
            /**
             * This event is fired when the circle is right-clicked on.
             */
            this.rightClick = new _angular_core.EventEmitter();
            this._circleAddedToManager = false;
            this._eventSubscriptions = [];
        }
        /** @internal */
        SebmGoogleMapCircle.prototype.ngOnInit = function () {
            this._manager.addCircle(this);
            this._circleAddedToManager = true;
            this._registerEventListeners();
        };
        /** @internal */
        SebmGoogleMapCircle.prototype.ngOnChanges = function (changes) {
            if (!this._circleAddedToManager) {
                return;
            }
            if (changes['latitude'] || changes['longitude']) {
                this._manager.setCenter(this);
            }
            if (changes['editable']) {
                this._manager.setEditable(this);
            }
            if (changes['draggable']) {
                this._manager.setDraggable(this);
            }
            if (changes['visible']) {
                this._manager.setVisible(this);
            }
            if (changes['radius']) {
                this._manager.setRadius(this);
            }
            this._updateCircleOptionsChanges(changes);
        };
        SebmGoogleMapCircle.prototype._updateCircleOptionsChanges = function (changes) {
            var options = {};
            var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapCircle_1._mapOptions.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
            if (optionKeys.length > 0) {
                this._manager.setOptions(this, options);
            }
        };
        SebmGoogleMapCircle.prototype._registerEventListeners = function () {
            var _this = this;
            var events = new Map();
            events.set('center_changed', this.centerChange);
            events.set('click', this.circleClick);
            events.set('dblclick', this.circleDblClick);
            events.set('drag', this.drag);
            events.set('dragend', this.dragEnd);
            events.set('dragStart', this.dragStart);
            events.set('mousedown', this.mouseDown);
            events.set('mousemove', this.mouseMove);
            events.set('mouseout', this.mouseOut);
            events.set('mouseover', this.mouseOver);
            events.set('mouseup', this.mouseUp);
            events.set('radius_changed', this.radiusChange);
            events.set('rightclick', this.rightClick);
            events.forEach(function (eventEmitter, eventName) {
                _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                    switch (eventName) {
                        case 'radius_changed':
                            _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                            break;
                        case 'center_changed':
                            _this._manager.getCenter(_this).then(function (center) { return eventEmitter.emit({ lat: center.lat(), lng: center.lng() }); });
                            break;
                        default:
                            eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                    }
                }));
            });
        };
        /** @internal */
        SebmGoogleMapCircle.prototype.ngOnDestroy = function () {
            this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
            this._eventSubscriptions = null;
            this._manager.removeCircle(this);
        };
        /**
         * Gets the LatLngBounds of this Circle.
         */
        SebmGoogleMapCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
        SebmGoogleMapCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
        return SebmGoogleMapCircle;
    }());
    exports.SebmGoogleMapCircle._mapOptions = [
        'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
        'visible', 'zIndex'
    ];
    exports.SebmGoogleMapCircle = SebmGoogleMapCircle_1 = __decorate$7([
        _angular_core.Directive({
            selector: 'sebm-google-map-circle',
            inputs: [
                'latitude', 'longitude', 'clickable', 'draggable: circleDraggable', 'editable', 'fillColor',
                'fillOpacity', 'radius', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
                'visible', 'zIndex'
            ],
            outputs: [
                'centerChange', 'circleClick', 'circleDblClick', 'drag', 'dragEnd', 'dragStart', 'mouseDown',
                'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'radiusChange', 'rightClick'
            ]
        }),
        __metadata$7('design:paramtypes', [exports.CircleManager])
    ], exports.SebmGoogleMapCircle);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$8 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var infoWindowId = 0;
    /**
     * SebmGoogleMapInfoWindow renders a info window inside a {@link SebmGoogleMapMarker} or standalone.
     *
     * ### Example
     * ```typescript
     * import {Component} from 'angular2/core';
     * import {SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow} from
     * 'angular2-google-maps/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  directives: [SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
     *  styles: [`
     *    .sebm-google-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *        <sebm-google-map-info-window [disableAutoPan]="true">
     *          Hi, this is the content of the <strong>info window</strong>
     *        </sebm-google-map-info-window>
     *      </sebm-google-map-marker>
     *    </sebm-google-map>
     *  `
     * })
     * ```
     */
    var SebmGoogleMapInfoWindow_1;
    exports.SebmGoogleMapInfoWindow = SebmGoogleMapInfoWindow_1 = (function () {
        function SebmGoogleMapInfoWindow(_infoWindowManager, _el) {
            this._infoWindowManager = _infoWindowManager;
            this._el = _el;
            /**
             * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
             */
            this.isOpen = false;
            /**
             * Emits an event when the info window is closed.
             */
            this.infoWindowClose = new _angular_core.EventEmitter();
            this._infoWindowAddedToManager = false;
            this._id = (infoWindowId++).toString();
        }
        SebmGoogleMapInfoWindow.prototype.ngOnInit = function () {
            this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
            this._infoWindowManager.addInfoWindow(this);
            this._infoWindowAddedToManager = true;
            this._updateOpenState();
        };
        /** @internal */
        SebmGoogleMapInfoWindow.prototype.ngOnChanges = function (changes) {
            if (!this._infoWindowAddedToManager) {
                return;
            }
            if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
                typeof this.longitude === 'number') {
                this._infoWindowManager.setPosition(this);
            }
            if (changes['zIndex']) {
                this._infoWindowManager.setZIndex(this);
            }
            if (changes['isOpen']) {
                this._updateOpenState();
            }
            this._setInfoWindowOptions(changes);
        };
        SebmGoogleMapInfoWindow.prototype._updateOpenState = function () {
            this.isOpen ? this._infoWindowManager.open(this) : this._infoWindowManager.close(this);
        };
        SebmGoogleMapInfoWindow.prototype._setInfoWindowOptions = function (changes) {
            var options = {};
            var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapInfoWindow_1._infoWindowOptionsInputs.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
            this._infoWindowManager.setOptions(this, options);
        };
        /**
         * Opens the info window.
         */
        SebmGoogleMapInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
        /**
         * Closes the info window.
         */
        SebmGoogleMapInfoWindow.prototype.close = function () {
            var _this = this;
            return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(void 0); });
        };
        /** @internal */
        SebmGoogleMapInfoWindow.prototype.id = function () { return this._id; };
        /** @internal */
        SebmGoogleMapInfoWindow.prototype.toString = function () { return 'SebmGoogleMapInfoWindow-' + this._id.toString(); };
        /** @internal */
        SebmGoogleMapInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
        return SebmGoogleMapInfoWindow;
    }());
    exports.SebmGoogleMapInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
    exports.SebmGoogleMapInfoWindow = SebmGoogleMapInfoWindow_1 = __decorate$8([
        _angular_core.Component({
            selector: 'sebm-google-map-info-window',
            inputs: ['latitude', 'longitude', 'disableAutoPan', 'isOpen', 'zIndex', 'maxWidth'],
            outputs: ['infoWindowClose'],
            template: "<div class='sebm-google-map-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        __metadata$8('design:paramtypes', [exports.InfoWindowManager, _angular_core.ElementRef])
    ], exports.SebmGoogleMapInfoWindow);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$9 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var markerId = 0;
    /**
     * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
     *
     * ### Example
     * ```typescript
     * import {Component} from 'angular2/core';
     * import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
     *  styles: [`
     *    .sebm-google-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *      </sebm-google-map-marker>
     *    </sebm-google-map>
     *  `
     * })
     * ```
     */
    exports.SebmGoogleMapMarker = (function () {
        function SebmGoogleMapMarker(_markerManager) {
            this._markerManager = _markerManager;
            /**
             * If true, the marker can be dragged. Default value is false.
             */
            this.draggable = false;
            /**
             * If true, the marker is visible
             */
            this.visible = true;
            /**
             * Whether to automatically open the child info window when the marker is clicked.
             */
            this.openInfoWindow = true;
            /**
             * The marker's opacity between 0.0 and 1.0.
             */
            this.opacity = 1;
            /**
             * All markers are displayed on the map in order of their zIndex, with higher values displaying in
             * front of markers with lower values. By default, markers are displayed according to their
             * vertical position on screen, with lower markers appearing in front of markers further up the
             * screen.
             */
            this.zIndex = 1;
            /**
             * This event emitter gets emitted when the user clicks on the marker.
             */
            this.markerClick = new _angular_core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the marker.
             */
            this.dragEnd = new _angular_core.EventEmitter();
            this._markerAddedToManger = false;
            this._observableSubscriptions = [];
            this._id = (markerId++).toString();
        }
        /* @internal */
        SebmGoogleMapMarker.prototype.ngAfterContentInit = function () {
            if (this._infoWindow != null) {
                this._infoWindow.hostMarker = this;
            }
        };
        /** @internal */
        SebmGoogleMapMarker.prototype.ngOnChanges = function (changes) {
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            if (!this._markerAddedToManger) {
                this._markerManager.addMarker(this);
                this._markerAddedToManger = true;
                this._addEventListeners();
                return;
            }
            if (changes['latitude'] || changes['longitude']) {
                this._markerManager.updateMarkerPosition(this);
            }
            if (changes['title']) {
                this._markerManager.updateTitle(this);
            }
            if (changes['label']) {
                this._markerManager.updateLabel(this);
            }
            if (changes['draggable']) {
                this._markerManager.updateDraggable(this);
            }
            if (changes['iconUrl']) {
                this._markerManager.updateIcon(this);
            }
            if (changes['opacity']) {
                this._markerManager.updateOpacity(this);
            }
            if (changes['visible']) {
                this._markerManager.updateVisible(this);
            }
            if (changes['zIndex']) {
                this._markerManager.updateZIndex(this);
            }
        };
        SebmGoogleMapMarker.prototype._addEventListeners = function () {
            var _this = this;
            var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
                if (_this.openInfoWindow && _this._infoWindow != null) {
                    _this._infoWindow.open();
                }
                _this.markerClick.emit(null);
            });
            this._observableSubscriptions.push(cs);
            var ds = this._markerManager.createEventObservable('dragend', this)
                .subscribe(function (e) {
                _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
            });
            this._observableSubscriptions.push(ds);
        };
        /** @internal */
        SebmGoogleMapMarker.prototype.id = function () { return this._id; };
        /** @internal */
        SebmGoogleMapMarker.prototype.toString = function () { return 'SebmGoogleMapMarker-' + this._id.toString(); };
        /** @internal */
        SebmGoogleMapMarker.prototype.ngOnDestroy = function () {
            this._markerManager.deleteMarker(this);
            // unsubscribe all registered observable subscriptions
            this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return SebmGoogleMapMarker;
    }());
    __decorate$9([
        _angular_core.ContentChild(exports.SebmGoogleMapInfoWindow),
        __metadata$9('design:type', exports.SebmGoogleMapInfoWindow)
    ], exports.SebmGoogleMapMarker.prototype, "_infoWindow", void 0);
    exports.SebmGoogleMapMarker = __decorate$9([
        _angular_core.Directive({
            selector: 'sebm-google-map-marker',
            inputs: [
                'latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl',
                'openInfoWindow', 'fitBounds', 'opacity', 'visible', 'zIndex'
            ],
            outputs: ['markerClick', 'dragEnd']
        }),
        __metadata$9('design:paramtypes', [exports.MarkerManager])
    ], exports.SebmGoogleMapMarker);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$11 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$11 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    /**
     * SebmGoogleMapPolylinePoint represents one element of a polyline within a  {@link
     * SembGoogleMapPolyline}
     */
    exports.SebmGoogleMapPolylinePoint = (function () {
        function SebmGoogleMapPolylinePoint() {
            /**
             * This event emitter gets emitted when the position of the point changed.
             */
            this.positionChanged = new _angular_core.EventEmitter();
        }
        SebmGoogleMapPolylinePoint.prototype.ngOnChanges = function (changes) {
            if (changes['latitude'] || changes['longitude']) {
                var position = {
                    lat: changes['latitude'].currentValue,
                    lng: changes['longitude'].currentValue
                };
                this.positionChanged.emit(position);
            }
        };
        return SebmGoogleMapPolylinePoint;
    }());
    __decorate$11([
        _angular_core.Input(),
        __metadata$11('design:type', Number)
    ], exports.SebmGoogleMapPolylinePoint.prototype, "latitude", void 0);
    __decorate$11([
        _angular_core.Input(),
        __metadata$11('design:type', Number)
    ], exports.SebmGoogleMapPolylinePoint.prototype, "longitude", void 0);
    __decorate$11([
        _angular_core.Output(),
        __metadata$11('design:type', _angular_core.EventEmitter)
    ], exports.SebmGoogleMapPolylinePoint.prototype, "positionChanged", void 0);
    exports.SebmGoogleMapPolylinePoint = __decorate$11([
        _angular_core.Directive({ selector: 'sebm-google-map-polyline-point' }),
        __metadata$11('design:paramtypes', [])
    ], exports.SebmGoogleMapPolylinePoint);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$10 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$10 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var polylineId = 0;
    /**
     * SebmGoogleMapPolyline renders a polyline on a {@link SebmGoogleMap}
     *
     * ### Example
     * ```typescript
     * import {Component} from 'angular2/core';
     * import {SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint} from
     * 'angular2-google-maps/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  directives: [SebmGoogleMap, SebmGooglePolyline, SebmGooglePolylinePoint],
     *  styles: [`
     *    .sebm-google-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <sebm-google-map-polyline>
     *          <sebm-google-map-polyline-point [latitude]="latA" [longitude]="lngA">
     *          </sebm-google-map-polyline-point>
     *          <sebm-google-map-polyline-point [latitude]="latB" [longitude]="lngB">
     *          </sebm-google-map-polyline-point>
     *      </sebm-google-map-polyline>
     *    </sebm-google-map>
     *  `
     * })
     * ```
     */
    var SebmGoogleMapPolyline_1;
    exports.SebmGoogleMapPolyline = SebmGoogleMapPolyline_1 = (function () {
        function SebmGoogleMapPolyline(_polylineManager) {
            this._polylineManager = _polylineManager;
            /**
             * Indicates whether this Polyline handles mouse events. Defaults to true.
             */
            this.clickable = true;
            /**
             * If set to true, the user can drag this shape over the map. The geodesic property defines the
             * mode of dragging. Defaults to false.
             */
            this.draggable = false;
            /**
             * If set to true, the user can edit this shape by dragging the control points shown at the
             * vertices and on each segment. Defaults to false.
             */
            this.editable = false;
            /**
             * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
             * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
             * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
             * are maintained relative to the surface of the earth. Defaults to false.
             */
            this.geodesic = false;
            /**
             * Whether this polyline is visible on the map. Defaults to true.
             */
            this.visible = true;
            /**
             * This event is fired when the DOM click event is fired on the Polyline.
             */
            this.lineClick = new _angular_core.EventEmitter();
            /**
             * This event is fired when the DOM dblclick event is fired on the Polyline.
             */
            this.lineDblClick = new _angular_core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the polyline.
             */
            this.lineDrag = new _angular_core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the polyline.
             */
            this.lineDragEnd = new _angular_core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the polyline.
             */
            this.lineDragStart = new _angular_core.EventEmitter();
            /**
             * This event is fired when the DOM mousedown event is fired on the Polyline.
             */
            this.lineMouseDown = new _angular_core.EventEmitter();
            /**
             * This event is fired when the DOM mousemove event is fired on the Polyline.
             */
            this.lineMouseMove = new _angular_core.EventEmitter();
            /**
             * This event is fired on Polyline mouseout.
             */
            this.lineMouseOut = new _angular_core.EventEmitter();
            /**
             * This event is fired on Polyline mouseover.
             */
            this.lineMouseOver = new _angular_core.EventEmitter();
            /**
             * This event is fired whe the DOM mouseup event is fired on the Polyline
             */
            this.lineMouseUp = new _angular_core.EventEmitter();
            /**
             * This even is fired when the Polyline is right-clicked on.
             */
            this.lineRightClick = new _angular_core.EventEmitter();
            this._polylineAddedToManager = false;
            this._subscriptions = [];
            this._id = (polylineId++).toString();
        }
        /** @internal */
        SebmGoogleMapPolyline.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this._points.length) {
                this._points.forEach(function (point) {
                    var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                    _this._subscriptions.push(s);
                });
            }
            if (!this._polylineAddedToManager) {
                this._init();
            }
            var s = this._points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
            this._subscriptions.push(s);
            this._polylineManager.updatePolylinePoints(this);
        };
        SebmGoogleMapPolyline.prototype.ngOnChanges = function (changes) {
            if (!this._polylineAddedToManager) {
                this._init();
                return;
            }
            var options = {};
            var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapPolyline_1._polylineOptionsAttributes.indexOf(k) !== -1; });
            optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
            this._polylineManager.setPolylineOptions(this, options);
        };
        SebmGoogleMapPolyline.prototype._init = function () {
            this._polylineManager.addPolyline(this);
            this._polylineAddedToManager = true;
            this._addEventListeners();
        };
        SebmGoogleMapPolyline.prototype._addEventListeners = function () {
            var _this = this;
            var handlers = [
                { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
                { name: 'dbclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
                { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
                { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
                { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
                { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
                { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
                { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
                { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
                { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
                { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
            ];
            handlers.forEach(function (obj) {
                var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
                _this._subscriptions.push(os);
            });
        };
        /** @internal */
        SebmGoogleMapPolyline.prototype._getPoints = function () {
            if (this._points) {
                return this._points.toArray();
            }
            return [];
        };
        /** @internal */
        SebmGoogleMapPolyline.prototype.id = function () { return this._id; };
        /** @internal */
        SebmGoogleMapPolyline.prototype.ngOnDestroy = function () {
            this._polylineManager.deletePolyline(this);
            // unsubscribe all registered observable subscriptions
            this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
        };
        return SebmGoogleMapPolyline;
    }());
    exports.SebmGoogleMapPolyline._polylineOptionsAttributes = [
        'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
        'zIndex'
    ];
    __decorate$10([
        _angular_core.ContentChildren(exports.SebmGoogleMapPolylinePoint),
        __metadata$10('design:type', _angular_core.QueryList)
    ], exports.SebmGoogleMapPolyline.prototype, "_points", void 0);
    exports.SebmGoogleMapPolyline = SebmGoogleMapPolyline_1 = __decorate$10([
        _angular_core.Directive({
            selector: 'sebm-google-map-polyline',
            inputs: [
                'clickable', 'draggable: polylineDraggable', 'editable', 'geodesic', 'strokeColor',
                'strokeWeight', 'strokeOpacity', 'visible', 'zIndex'
            ],
            outputs: [
                'lineClick', 'lineDblClick', 'lineDrag', 'lineDragEnd', 'lineMouseDown', 'lineMouseMove',
                'lineMouseOut', 'lineMouseOver', 'lineMouseUp', 'lineRightClick'
            ]
        }),
        __metadata$10('design:paramtypes', [exports.PolylineManager])
    ], exports.SebmGoogleMapPolyline);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var WINDOW_GLOBAL = new _angular_core.OpaqueToken('angular2-google-maps window_global');
    var DOCUMENT_GLOBAL = new _angular_core.OpaqueToken('angular2-google-maps document_global');
    var BROWSER_GLOBALS_PROVIDERS = [{ provide: WINDOW_GLOBAL, useValue: window }, { provide: DOCUMENT_GLOBAL, useValue: document }];
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$12 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$12 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    };
    (function (GoogleMapsScriptProtocol) {
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
    })(exports.GoogleMapsScriptProtocol || (exports.GoogleMapsScriptProtocol = {}));
    /**
     * Configuration for {@link LazyMapsAPILoader}.
     * See {@link LazyMapsAPILoaderConfig} for instance attribute descriptions.
     */
    var LazyMapsAPILoaderConfig = (function () {
        function LazyMapsAPILoaderConfig() {
            this.apiKey = null;
            this.clientId = null;
            this.channel = null;
            this.apiVersion = '3';
            this.hostAndPath = 'maps.googleapis.com/maps/api/js';
            this.protocol = exports.GoogleMapsScriptProtocol.HTTPS;
            this.libraries = [];
            this.region = null;
            this.language = null;
        }
        return LazyMapsAPILoaderConfig;
    }());
    var DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();
    exports.LazyMapsAPILoader = (function (_super) {
        __extends(LazyMapsAPILoader, _super);
        function LazyMapsAPILoader(config, w, d) {
            _super.call(this);
            this._config = config || DEFAULT_CONFIGURATION;
            this._window = w;
            this._document = d;
        }
        LazyMapsAPILoader.prototype.load = function () {
            var _this = this;
            if (this._scriptLoadingPromise) {
                return this._scriptLoadingPromise;
            }
            var script = this._document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.defer = true;
            var callbackName = "angular2GoogleMapsLazyMapsAPILoader";
            script.src = this._getScriptSrc(callbackName);
            this._scriptLoadingPromise = new Promise(function (resolve, reject) {
                _this._window[callbackName] = function () { resolve(); };
                script.onerror = function (error) { reject(error); };
            });
            this._document.body.appendChild(script);
            return this._scriptLoadingPromise;
        };
        LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
            var protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
            var protocol;
            switch (protocolType) {
                case exports.GoogleMapsScriptProtocol.AUTO:
                    protocol = '';
                    break;
                case exports.GoogleMapsScriptProtocol.HTTP:
                    protocol = 'http:';
                    break;
                case exports.GoogleMapsScriptProtocol.HTTPS:
                    protocol = 'https:';
                    break;
            }
            var hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
            var queryParams = {
                v: this._config.apiVersion || DEFAULT_CONFIGURATION.apiVersion,
                callback: callbackName,
                key: this._config.apiKey,
                client: this._config.clientId,
                channel: this._config.channel,
                libraries: this._config.libraries,
                region: this._config.region,
                language: this._config.language
            };
            var params = Object.keys(queryParams)
                .filter(function (k) { return queryParams[k] != null; })
                .filter(function (k) {
                // remove empty arrays
                return !Array.isArray(queryParams[k]) ||
                    (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
            })
                .map(function (k) {
                // join arrays as comma seperated strings
                var i = queryParams[k];
                if (Array.isArray(i)) {
                    return { key: k, value: i.join(',') };
                }
                return { key: k, value: queryParams[k] };
            })
                .map(function (entry) { return entry.key + "=" + entry.value; })
                .join('&');
            return protocol + "//" + hostAndPath + "?" + params;
        };
        return LazyMapsAPILoader;
    }(exports.MapsAPILoader));
    exports.LazyMapsAPILoader = __decorate$12([
        _angular_core.Injectable(),
        __param(0, _angular_core.Optional()),
        __param(1, _angular_core.Inject(WINDOW_GLOBAL)),
        __param(2, _angular_core.Inject(DOCUMENT_GLOBAL)),
        __metadata$12('design:paramtypes', [LazyMapsAPILoaderConfig, Window, Document])
    ], exports.LazyMapsAPILoader);
    /**
     * Creates a provider for a {@link LazyMapsAPILoaderConfig})
     */
    function provideLazyMapsAPILoaderConfig(confLiteral) {
        return {
            provide: LazyMapsAPILoaderConfig,
            useFactory: function () {
                var config = new LazyMapsAPILoaderConfig();
                // todo(sebastian): deprecate LazyMapsAPILoader class
                config.apiKey = confLiteral.apiKey || DEFAULT_CONFIGURATION.apiKey;
                config.apiVersion = confLiteral.apiVersion || DEFAULT_CONFIGURATION.apiVersion;
                config.channel = confLiteral.channel || DEFAULT_CONFIGURATION.channel;
                config.clientId = confLiteral.clientId || DEFAULT_CONFIGURATION.clientId;
                config.hostAndPath = confLiteral.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
                config.language = confLiteral.language || DEFAULT_CONFIGURATION.language;
                config.libraries = confLiteral.libraries || DEFAULT_CONFIGURATION.libraries;
                config.protocol = config.protocol || DEFAULT_CONFIGURATION.protocol;
                config.region = config.region || DEFAULT_CONFIGURATION.region;
                return config;
            }
        };
    }
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    /**
     * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
     * Tag.
     * It's important that the Google Maps API script gets loaded first on the page.
     */
    var NoOpMapsAPILoader = (function () {
        function NoOpMapsAPILoader() {
        }
        NoOpMapsAPILoader.prototype.load = function () {
            if (!window.google || !window.google.maps) {
                throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
            }
            return Promise.resolve();
        };
        ;
        return NoOpMapsAPILoader;
    }());
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    // exported map types
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    var __decorate$13 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$13 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    var CORE_DIRECTIVES = [
        exports.SebmGoogleMap, exports.SebmGoogleMapMarker, exports.SebmGoogleMapInfoWindow, exports.SebmGoogleMapCircle,
        exports.SebmGoogleMapPolyline, exports.SebmGoogleMapPolylinePoint
    ];
    /**
     * The angular2-google-maps core module. Contains all Directives/Services/Pipes
     * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
     */
    var AgmCoreModule_1;
    exports.AgmCoreModule = AgmCoreModule_1 = (function () {
        function AgmCoreModule() {
        }
        /**
         * Please use this method when you register the module at the root level.
         */
        AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
            var providers = BROWSER_GLOBALS_PROVIDERS.concat([{ provide: exports.MapsAPILoader, useClass: exports.LazyMapsAPILoader }]);
            if (lazyMapsAPILoaderConfig) {
                providers.push(provideLazyMapsAPILoaderConfig(lazyMapsAPILoaderConfig));
            }
            return {
                ngModule: AgmCoreModule_1,
                providers: providers,
            };
        };
        return AgmCoreModule;
    }());
    exports.AgmCoreModule = AgmCoreModule_1 = __decorate$13([
        _angular_core.NgModule({ declarations: CORE_DIRECTIVES, exports: CORE_DIRECTIVES }),
        __metadata$13('design:paramtypes', [])
    ], exports.AgmCoreModule);
    /**
     * angular2-google-maps - Angular 2 components for Google Maps
     * @version v0.15.0
     * @link https://github.com/SebastianM/angular2-google-maps#readme
     * @license MIT
     */
    // main modules
    exports.LazyMapsAPILoaderConfig = LazyMapsAPILoaderConfig;
    exports.provideLazyMapsAPILoaderConfig = provideLazyMapsAPILoaderConfig;
    exports.NoOpMapsAPILoader = NoOpMapsAPILoader;
    Object.defineProperty(exports, '__esModule', { value: true });
})));
