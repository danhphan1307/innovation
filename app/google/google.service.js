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
var http_1 = require('@angular/http');
//Requiered method
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
var GoogleService = (function () {
    function GoogleService(http) {
        this.http = http;
    }
    //Create a google based map
    GoogleService.prototype.createMap = function (center, zoom) {
        var mapProperties = {
            center: new google.maps.LatLng(center.lat, center.lon),
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        return new google.maps.Map(document.getElementById("mapCanvas"), mapProperties);
    };
    //wrapper for marker later
    GoogleService.prototype.createMarker = function (coords, icon, map) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(coords.lat, coords.lon),
            icon: icon,
            map: map
        });
    };
    //Create a circle on the map
    GoogleService.prototype.createCircle = function (coords, radius, map) {
        return new google.maps.Circle({
            strokeColor: '#4a6aa5',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map: map,
            center: new google.maps.LatLng(coords.lat, coords.lon),
            radius: radius
        });
    };
    GoogleService.prototype.createPolygon = function (path, colorCode) {
        if (path === void 0) { path = []; }
        return new google.maps.Polygon({
            paths: path,
            strokeColor: colorCode,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0
        });
    };
    GoogleService.prototype.showWaypoints = function (start, end) {
        console.log("to be implemented");
    };
    GoogleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GoogleService);
    return GoogleService;
}());
exports.GoogleService = GoogleService;
//# sourceMappingURL=google.service.js.map