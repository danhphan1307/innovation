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
var router_1 = require('@angular/router');
var map_service_1 = require('./map.service');
var google_service_1 = require('../google/google.service');
var localStorage_isSupported = (function () {
    try {
        var itemBackup = localStorage.getItem("");
        localStorage.removeItem("");
        localStorage.setItem("", itemBackup);
        if (itemBackup === null)
            localStorage.removeItem("");
        else
            localStorage.setItem("", itemBackup);
        return true;
    }
    catch (e) {
        return false;
    }
})();
var MapComponent = (function () {
    function MapComponent(_router, _mapService, _googleService) {
        this._router = _router;
        this._mapService = _mapService;
        this._googleService = _googleService;
        this.centerLat = 0;
        this.centerLon = 0;
        this.centerCoords = new location_1.Coords(0.0, 0.0);
        this.counter = 0;
        this.facilitymarkers = [];
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            preserveViewport: true
        });
        this.markers = [];
        this.circles = [];
        this.centerUpdated = new core_1.EventEmitter();
        this.clickUpdated = new core_1.EventEmitter();
        this.doneLoading = new core_1.EventEmitter();
        //Polygons array
        this.polygons = [];
        this.saveUpdated = new core_1.EventEmitter();
        this.klmSrc = 'https://sites.google.com/site/lnknguyenmyfiles/kmlfiles/vyohykerajat_ETRS.kml';
        this.kmlLayer = new google.maps.KmlLayer(this.klmSrc, {
            suppressInfoWindows: true,
            preserveViewport: true
        });
        this.router = _router;
        this.service = _mapService;
        this.googleService = _googleService;
    }
    MapComponent.prototype.ngOnInit = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.createMap.bind(this), this.noGeolocation);
        }
        else {
            this.geolocationNotSupported();
        }
    };
    MapComponent.prototype.noGeolocation = function () {
        document.getElementById("mapCanvas").innerHTML = '<div class="alert alert-danger" role="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Please enable Geolocation to use our service.</div>';
    };
    MapComponent.prototype.geolocationNotSupported = function () {
        document.getElementById("mapCanvas").innerHTML = '<div class="alert alert-danger" role="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> This browser does not support Geolocation.</div>';
    };
    MapComponent.prototype.createMap = function (position) {
        this.centerLat = position.coords.latitude;
        this.centerLon = position.coords.longitude;
        this.centerCoords = new location_1.Coords(this.centerLat, this.centerLon);
        this.centerUpdated.emit(this.centerCoords);
        this.map = this.googleService.createMap(this.centerCoords, 13);
        this.directionsDisplay.setMap(this.map);
        this.centerMarker = this.googleService.createMarker(this.centerCoords, "img/red-dot.png", this.map);
        this.createEventListeners();
        //Geocoding
        this.service.geocodeTesting("Kilo");
        //Signal that map has done loading
        this.doneLoading.emit(true);
        this.clickUpdated.emit(this.centerCoords);
        this.placeCircle(this.centerLat, this.centerLon, this.circleRadius);
    };
    MapComponent.prototype.center = function (lat, long) {
        if (lat === void 0) { lat = this.centerLat; }
        if (long === void 0) { long = this.centerLon; }
        this.map.panTo(new google.maps.LatLng(lat, long));
    };
    MapComponent.prototype.placeMarker = function (lat, lon) {
        var _this = this;
        var marker = this.googleService.createMarker(new location_1.Coords(lat, lon), "", this.map);
        this.markers.push(marker);
        google.maps.event.addListener(marker, 'click', function () { return _this.showDirection(marker); });
    };
    MapComponent.prototype.placeMarkerFacility = function (f) {
        var _this = this;
        var infowindow = new google.maps.InfoWindow();
        var map = this.map;
        var type;
        var icons = {
            small: {
                icon: 'img/parkingIconSmall.png'
            },
            large: {
                icon: 'img/parkingIconLarge.png'
            }
        };
        var iconsBike = {
            small: {
                icon: 'img/bikeStationIconSmall.png'
            },
            large: {
                icon: 'img/bikeStationIcon.png'
            }
        };
        var zoomLevel = map.getZoom();
        if (zoomLevel < 14) {
            type = 'small';
        }
        else {
            type = 'large';
        }
        for (var i = 0; i < f.length; i++) {
            var coordinate = new location_1.Coords(f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0]);
            if (f[i].name.en.indexOf('bike') !== -1) {
                var markerFacility = this.googleService.createMarker(coordinate, iconsBike[type].icon, this.map);
            }
            else {
                var markerFacility = this.googleService.createMarker(coordinate, icons[type].icon, this.map);
            }
            this.facilitymarkers.push(markerFacility);
            var func = (function (markerFacility, i) {
                google.maps.event.addListener(markerFacility, 'click', function () {
                    var content = '<div class="cityBike"><div class="title"><h3>Park and Ride</h3><img id="markerFacility" src="img/directionIcon.png" alt="show direction icon" class="functionIcon" style="margin-right:10px;"><br><span>' + f[i].name.en + '</span><br>';
                    if (f[i].name.en.indexOf('bike') !== -1) {
                        content += 'Bicycle Capacity :' + (f[i].builtCapacity.BICYCLE || 0);
                    }
                    else {
                        content += 'Car Capacity :' + (f[i].builtCapacity.CAR || 0) + '<br>';
                        content += 'Disabled Capacity:' + (f[i].builtCapacity.DISABLED || 0) + '<br>';
                        content += 'Motorbike Capacity:' + (f[i].builtCapacity.MOTORCYCLE || 0);
                    }
                    content += '<hr class="separate"><button id="saveButton">I park here</button></div></div>';
                    infowindow.setContent(content);
                    infowindow.open(_this.map, markerFacility);
                    var el = document.getElementById('markerFacility');
                    google.maps.event.addDomListener(el, 'click', function () {
                        _this.service.showDirection(_this.centerCoords, markerFacility, function (result, status) { return _this.callbackForShowDirection(result, status); });
                    });
                    var el2 = document.getElementById('saveButton');
                    google.maps.event.addDomListener(el2, 'click', function () {
                        if (localStorage_isSupported) {
                            localStorage.setItem('carLocation', JSON.stringify(f[i]));
                            _this.saveLocation = f[i];
                            _this.saveUpdated.emit(_this.saveLocation);
                        }
                    });
                });
                google.maps.event.addDomListener(map, 'zoom_changed', function () {
                    var zoomLevel = map.getZoom();
                    if (zoomLevel < 14) {
                        type = 'small';
                    }
                    else {
                        type = 'large';
                    }
                    if (f[i].name.en.indexOf('bike') !== -1) {
                        markerFacility.setIcon(iconsBike[type].icon);
                    }
                    else {
                        markerFacility.setIcon(icons[type].icon);
                    }
                });
            })(markerFacility, i);
        }
    };
    MapComponent.prototype.placeMarkerBicycle = function (stations) {
        var _this = this;
        var infowindow = new google.maps.InfoWindow();
        var map = this.map;
        var type;
        var icons = {
            small: {
                icon: 'img/smallBike.png'
            },
            large: {
                icon: 'img/largeBike.png'
            }
        };
        var zoomLevel = map.getZoom();
        if (zoomLevel < 14) {
            type = 'small';
        }
        else {
            type = 'large';
        }
        for (var i = 0; i < stations.length; i++) {
            var coordinate = new location_1.Coords(stations[i].y, stations[i].x);
            var markerBike = this.googleService.createMarker(coordinate, icons[type].icon, this.map);
            this.markers.push(markerBike);
            var func = (function (markerBike, i) {
                google.maps.event.addListener(markerBike, 'click', function () {
                    var content = '<div class="cityBike"><div class="title"><h3>Citybike Station</h3><img id="markerBike" src="img/directionIcon.png" alt="love icon" class="functionIcon"><br><span>' + stations[i].name + '</span><h4 class="info"> Bike Available: ' + stations[i].bikesAvailable + '/' + (stations[i].bikesAvailable + stations[i].spacesAvailable) + '</h4></div>';
                    for (var counter = 0; counter < (stations[i].bikesAvailable); counter++) {
                        content += '<div class="freeBike">&nbsp;</div>';
                    }
                    for (var counter = 0; counter < (stations[i].spacesAvailable); counter++) {
                        content += '<div class="freeSpot">&nbsp;</div>';
                    }
                    content += '<hr class="separate"><button class="register"><a href="https://www.hsl.fi/citybike">Register to use</a></button><br><br><a href="https://www.hsl.fi/kaupunkipyorat" class="moreInfo"><span class="glyphicon glyphicon-info-sign"></span> More information</a></div>';
                    infowindow.setContent(content);
                    infowindow.open(_this.map, markerBike);
                    var el = document.getElementById('markerBike');
                    google.maps.event.addDomListener(el, 'click', function () {
                        _this.showDirection(markerBike);
                    });
                });
                google.maps.event.addDomListener(map, 'zoom_changed', function () {
                    var zoomLevel = map.getZoom();
                    if (zoomLevel < 14) {
                        type = 'small';
                    }
                    else {
                        type = 'large';
                    }
                    markerBike.setIcon(icons[type].icon);
                });
            })(markerBike, i);
        }
    };
    MapComponent.prototype.placeCircle = function (lat, lon, radius) {
        this.clearCircles();
        if (radius != 0) {
            this.circles.push(this.googleService.createCircle(new location_1.Coords(lat, lon), radius, this.map));
        }
    };
    MapComponent.prototype.placePolygon = function (coordArray, colorCode) {
        var path = [];
        for (var i = 0; i < coordArray.length; i++) {
            path.push(new google.maps.LatLng(coordArray[i][1], coordArray[i][0]));
        }
        var polygon = this.googleService.createPolygon(path, colorCode);
        polygon.setMap(this.map);
        this.polygons.push(polygon);
    };
    //Remove all markers on map
    MapComponent.prototype.clearMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    };
    //Remove all circles on map
    MapComponent.prototype.clearCircles = function () {
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].setMap(null);
        }
    };
    //Remove all polygons on map
    MapComponent.prototype.clearPolygons = function () {
        for (var i = 0; i < this.polygons.length; i++) {
            this.polygons[i].setMap(null);
        }
    };
    //Remove KML layers
    MapComponent.prototype.clearKML = function () {
        this.kmlLayer.setMap(null);
    };
    MapComponent.prototype.callbackForShowDirection = function (result, status) {
        if (status == 'OK') {
            this.directionsDisplay.setDirections(result);
        }
        ;
    };
    MapComponent.prototype.displayKML = function () {
        this.kmlLayer.setMap(this.map);
    };
    MapComponent.prototype.updateRadius = function (event) {
        this.circleRadius = event;
        if (this.oldLat == null) {
        }
        else {
            if (this.oldRadius == null) {
            }
            else {
                if (this.oldRadius != event) {
                    this.oldRadius = event;
                    this.clearCircles();
                    this.placeCircle(this.oldLat, this.oldLong, this.circleRadius);
                }
            }
        }
    };
    //Private functions
    MapComponent.prototype.createEventListeners = function () {
        var _this = this;
        this.map.addListener('click', function (event) { return _this.callbackForMapClickEvent(event); });
    };
    MapComponent.prototype.callbackForMapClickEvent = function (event) {
        if (this.router.url == "/parking") {
            this.counter++;
            var clickCoord = new location_1.Coords(event.latLng.lat(), event.latLng.lng());
            this.oldLat = event.latLng.lat();
            this.oldLong = event.latLng.lng();
            this.clearMarkers();
            this.placeMarker(event.latLng.lat(), event.latLng.lng());
            this.oldRadius = this.circleRadius;
        }
    };
    MapComponent.prototype.renderDirections = function (result) {
        var directionsRenderer = new google.maps.DirectionsRenderer;
        directionsRenderer.setMap(this.map);
        directionsRenderer.setDirections(result);
    };
    MapComponent.prototype.showDirection = function (marker) {
        var _this = this;
        if (marker === void 0) { marker = null; }
        /*This is hot fix only.*/
        var start = new google.maps.LatLng(this.centerLat, this.centerLon);
        var min;
        var chosenMarker;
        for (var i = 0; i < this.facilitymarkers.length; i++) {
            var temp = google.maps.geometry.spherical.computeDistanceBetween(this.facilitymarkers[i].getPosition(), start);
            if (i == 0 || min > temp) {
                min = temp;
                chosenMarker = this.facilitymarkers[i];
            }
        }
        for (var i = 0; i < this.facilitymarkers.length; i++) {
            if (chosenMarker != this.facilitymarkers[i]) {
                this.facilitymarkers[i].setMap(null);
            }
        }
        var start0 = new google.maps.LatLng(this.centerLat, this.centerLon);
        start = chosenMarker.getPosition();
        var end = marker.getPosition();
        var directionsService = new google.maps.DirectionsService;
        directionsService.route({
            origin: start0,
            destination: start,
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
        }, function (result) {
            _this.renderDirections(result);
        });
        directionsService.route({
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.TRANSIT
        }, function (result) {
            console.log(result);
            _this.renderDirections(result);
        });
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
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "doneLoading", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MapComponent.prototype, "saveUpdated", void 0);
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map-gg',
            template: "\n    <div id=\"mapCanvas\" ></div>\n\n    ",
            providers: [map_service_1.MapService, google_service_1.GoogleService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, map_service_1.MapService, google_service_1.GoogleService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map