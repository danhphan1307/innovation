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
var location_1 = require('../models/location');
var MapComponent = (function () {
    function MapComponent() {
        this.centerLat = 0;
        this.centerLon = 0;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.markers = [];
        this.circles = [];
        this.centerUpdated = new core_1.EventEmitter();
        this.clickUpdated = new core_1.EventEmitter();
    }
    MapComponent.prototype.ngOnInit = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.createMap.bind(this));
        }
    };
    MapComponent.prototype.createMap = function (position) {
        this.centerLat = position.coords.latitude;
        this.centerLon = position.coords.longitude;
        this.centerUpdated.emit(new location_1.Coords(this.centerLat, this.centerLon));
        var mapProp = {
            center: new google.maps.LatLng(this.centerLat, this.centerLon),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
        //Bind direction display to map
        this.directionsDisplay.setMap(this.map);
        this.centerMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.centerLat, this.centerLon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
        this.createEventListeners();
    };
    MapComponent.prototype.placeMarker = function (lat, lon) {
        var _this = this;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        this.markers.push(marker);
        google.maps.event.addListener(marker, 'click', function () { return _this.showDirection(marker); });
    };
    MapComponent.prototype.placeCircle = function (lat, lon, radius) {
        this.circles.push(new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map: this.map,
            center: new google.maps.LatLng(lat, lon),
            radius: radius
        }));
    };
    MapComponent.prototype.clearMap = function () {
        this.clearMarkers();
        this.clearCircles();
    };
    //Private functions
    MapComponent.prototype.createEventListeners = function () {
        var _this = this;
        this.map.addListener('click', function (event) { return _this.callbackForMapClickEvent(event); });
    };
    MapComponent.prototype.callbackForMapClickEvent = function (event) {
        var clickCoord = new location_1.Coords(event.latLng.lat(), event.latLng.lng());
        //Clear from previous searches
        this.clearMarkers();
        this.clearCircles();
        //Create new circle and notify parent view
        this.placeCircle(event.latLng.lat(), event.latLng.lng(), this.circleRadius);
        this.clickUpdated.emit(clickCoord);
    };
    MapComponent.prototype.showDirection = function (marker) {
        var _this = this;
        var start = new google.maps.LatLng(this.centerLat, this.centerLon);
        var end = marker.getPosition();
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        var directionsService = new google.maps.DirectionsService;
        directionsService.route(request, function (result, status) { return _this.callbackForShowDirection(result, status); });
    };
    MapComponent.prototype.callbackForShowDirection = function (result, status) {
        if (status == 'OK') {
            this.directionsDisplay.setDirections(result);
        }
        ;
    };
    MapComponent.prototype.clearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    };
    MapComponent.prototype.clearCircles = function () {
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].setMap(null);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MapComponent.prototype, "circleRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MapComponent.prototype, "markers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MapComponent.prototype, "circles", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "centerUpdated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "clickUpdated", void 0);
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map-gg',
            template: "\n    <div id=\"mapCanvas\" ></div>\n    ",
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map