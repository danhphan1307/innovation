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
var global = require('../globals');
var marker_1 = require('../marker/marker');
//Requiered method
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
var MapService = (function () {
    function MapService() {
    }
    MapService.prototype.showDirection = function (origin, destionation) {
        var _this = this;
        var start = new google.maps.LatLng(this.coords.lat, this.coords.lon);
        var end = marker.getPosition();
        console.log(end.lat(), end.lng());
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        var directionsService = new google.maps.DirectionsService;
        directionsService.route(request, function (result, status) { return _this.callback(result, status); });
    };
    MapService.prototype.callback = function (result, status) {
        if (status == 'OK') {
            global.directionsDisplay.setDirections(result);
        }
        ;
    };
    MapService.prototype.placeMarkers = function (lat, lon, map) {
        var m = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
        m.setMap(map);
        console.log(global.map);
        return new marker_1.Marker(m.getIcon(), m.getPosition().lat(), m.getPosition().lng());
    };
    MapService.prototype.geocodeTesting = function (address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': 'Kilonrinne' }, function (res, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(res);
            }
        });
    };
    MapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MapService);
    return MapService;
}());
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map