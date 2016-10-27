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
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
export let GoogleMapsAPIWrapper = class GoogleMapsAPIWrapper {
    constructor(_loader, _zone) {
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise((resolve) => { this._mapResolver = resolve; });
    }
    createMap(el, mapOptions) {
        return this._loader.load().then(() => {
            const map = new google.maps.Map(el, mapOptions);
            this._mapResolver(map);
            return;
        });
    }
    setMapOptions(options) {
        this._map.then((m) => { m.setOptions(options); });
    }
    /**
     * Creates a google map marker with the map context
     */
    createMarker(options = {}) {
        return this._map.then((map) => {
            options.map = map;
            return new google.maps.Marker(options);
        });
    }
    createInfoWindow(options) {
        return this._map.then(() => { return new google.maps.InfoWindow(options); });
    }
    /**
     * Creates a google.map.Circle for the current map.
     */
    createCircle(options) {
        return this._map.then((map) => {
            options.map = map;
            return new google.maps.Circle(options);
        });
    }
    createPolyline(options) {
        return this.getNativeMap().then((map) => {
            let line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    }
    subscribeToMapEvent(eventName) {
        return Observable.create((observer) => {
            this._map.then((m) => {
                m.addListener(eventName, (arg) => { this._zone.run(() => observer.next(arg)); });
            });
        });
    }
    setCenter(latLng) {
        return this._map.then((map) => map.setCenter(latLng));
    }
    getZoom() { return this._map.then((map) => map.getZoom()); }
    getBounds() {
        return this._map.then((map) => map.getBounds());
    }
    setZoom(zoom) {
        return this._map.then((map) => map.setZoom(zoom));
    }
    getCenter() {
        return this._map.then((map) => map.getCenter());
    }
    panTo(latLng) {
        return this._map.then((map) => map.panTo(latLng));
    }
    fitBounds(latLng) {
        return this._map.then((map) => map.fitBounds(latLng));
    }
    panToBounds(latLng) {
        return this._map.then((map) => map.panToBounds(latLng));
    }
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    getNativeMap() { return this._map; }
    /**
     * Triggers the given event name on the map instance.
     */
    triggerMapEvent(eventName) {
        return this._map.then((m) => google.maps.event.trigger(m, eventName));
    }
};
GoogleMapsAPIWrapper = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [MapsAPILoader, NgZone])
], GoogleMapsAPIWrapper);

//# sourceMappingURL=google-maps-api-wrapper.js.map
