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
        this.directionArray = [];
        this.infowindowPolygon = new google.maps.InfoWindow({
            maxWidth: 200
        });
        this.infowindow = new google.maps.InfoWindow();
        this.infowindowBike = new google.maps.InfoWindow();
        this.icons = {
            small: {
                icon: 'img/parkingIconSmall.png'
            },
            large: {
                icon: 'img/parkingIconLarge.png'
            }
        };
        this.iconsBikeStation = {
            small: {
                icon: 'img/bikeStationIconSmall.png'
            },
            large: {
                icon: 'img/bikeStationIcon.png'
            }
        };
        this.iconsBike = {
            small: {
                icon: 'img/smallBike.png'
            },
            large: {
                icon: 'img/largeBike.png'
            }
        };
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
        var mapProp = {
            center: new google.maps.LatLng(this.centerLat, this.centerLon),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
        this.centerMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.centerLat, this.centerLon),
            map: this.map,
        });
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
        var infowindow = new google.maps.InfoWindow();
        var geocoder = new google.maps.Geocoder();
        var destination_marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: this.map,
        });
        this.markers.push(destination_marker);
        if (this.counter > 1) {
            geocoder.geocode({
                'latLng': destination_marker.getPosition()
            }, function (result, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var content = '<div class="cityBike"><div class="title"><h3>Destination</h3><img id="destination_marker" src="img/directionIcon.png" alt="show direction icon" class="functionIcon" style="margin-right:10px;"><br><span>' + result[0].formatted_address + '</span><br>';
                    infowindow.setContent(content);
                    infowindow.open(_this.map, destination_marker);
                }
                else {
                    console.log('Geocoder failed due to: ' + status);
                }
                var el = document.getElementById('destination_marker');
                google.maps.event.addDomListener(el, 'click', function () {
                    _this.showDirection(destination_marker);
                });
            });
        }
        //google.maps.event.addListener(destination_marker,'click',() => this.showDirection(destination_marker));
        return destination_marker;
    };
    MapComponent.prototype.getZoomLevel = function () {
        var zoomLevel = this.map.getZoom();
        if (zoomLevel < 13) {
            return 'small';
        }
        else {
            return 'large';
        }
    };
    MapComponent.prototype.placeMarkerFacility = function (f) {
        var _this = this;
        var map = this.map;
        var type = this.getZoomLevel();
        for (var i = 0; i < f.length; i++) {
            if (f[i].name.en.indexOf('bike') !== -1) {
                var markerFacility = new google.maps.Marker({
                    position: new google.maps.LatLng(f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0]),
                    map: this.map,
                    icon: this.iconsBikeStation[type].icon
                });
            }
            else {
                var markerFacility = new google.maps.Marker({
                    position: new google.maps.LatLng(f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0]),
                    map: this.map,
                    icon: this.icons[type].icon
                });
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
                    if (JSON.parse(localStorage.getItem('carLocation')).name.en == f[i].name.en) {
                        content += '<hr class="separate"><button id="saveButton" class="active">You parked here</button></div></div>';
                    }
                    else {
                        content += '<hr class="separate"><button id="saveButton">Park here</button></div></div>';
                    }
                    _this.infowindow.setContent(content);
                    _this.infowindow.open(_this.map, markerFacility);
                    var el = document.getElementById('markerFacility');
                    google.maps.event.addDomListener(el, 'click', function () {
                        _this.showDirection(markerFacility, false);
                    });
                    var el2 = document.getElementById('saveButton');
                    google.maps.event.addDomListener(el2, 'click', function () {
                        if (localStorage_isSupported) {
                            var temp = f[i];
                            temp.date = Date();
                            localStorage.setItem('carLocation', JSON.stringify(temp));
                            _this.saveLocation = f[i];
                            _this.saveUpdated.emit(_this.saveLocation);
                            document.getElementById("saveButton").className = "active";
                            document.getElementById("saveButton").innerHTML = "You parked here";
                        }
                    });
                });
                google.maps.event.addDomListener(map, 'zoom_changed', function () {
                    type = _this.getZoomLevel();
                    if (f[i].name.en.indexOf('bike') !== -1) {
                        markerFacility.setIcon(_this.iconsBikeStation[type].icon);
                    }
                    else {
                        markerFacility.setIcon(_this.icons[type].icon);
                    }
                });
            })(markerFacility, i);
        }
    };
    MapComponent.prototype.placeMarkerBicycle = function (stations) {
        var _this = this;
        var map = this.map;
        var type = this.getZoomLevel();
        for (var i = 0; i < stations.length; i++) {
            var markerBike = new google.maps.Marker({
                position: new google.maps.LatLng(stations[i].y, stations[i].x),
                map: this.map,
                icon: this.iconsBike[type].icon
            });
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
                    _this.infowindowBike.setContent(content);
                    _this.infowindowBike.open(_this.map, markerBike);
                    var el = document.getElementById('markerBike');
                    google.maps.event.addDomListener(el, 'click', function () {
                        _this.showDirection(markerBike, false);
                    });
                });
                google.maps.event.addDomListener(map, 'zoom_changed', function () {
                    type = _this.getZoomLevel();
                    markerBike.setIcon(_this.iconsBike[type].icon);
                });
            })(markerBike, i);
        }
    };
    MapComponent.prototype.placeCircle = function (lat, lon, radius) {
        this.clearCircles();
        if (radius != 0) {
            this.circles.push(new google.maps.Circle({
                strokeColor: '#4a6aa5',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                map: this.map,
                center: new google.maps.LatLng(lat, lon),
                radius: radius
            }));
        }
    };
    MapComponent.prototype.stringHandler = function (input_string) {
        return (input_string.charAt(0).toUpperCase() + input_string.slice(1)).replace(/_/g, " ");
    };
    MapComponent.prototype.placePolygon = function (coordArray, colorCode, type) {
        var _this = this;
        if (type === void 0) { type = " "; }
        var path = [];
        var bounds = new google.maps.LatLngBounds();
        var geocoder = new google.maps.Geocoder();
        for (var i = 0; i < coordArray.length; i++) {
            var temp = new google.maps.LatLng(coordArray[i][1], coordArray[i][0]);
            path.push(temp);
            bounds.extend(temp);
        }
        var markerPolygon = new google.maps.Marker({
            position: new google.maps.LatLng(bounds.getCenter().lat(), bounds.getCenter().lng()),
            map: this.map,
            visible: false
        });
        this.markers.push(markerPolygon);
        var polygon = new google.maps.Polygon({
            paths: path,
            strokeColor: colorCode,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0
        });
        polygon.setMap(this.map);
        this.polygons.push(polygon);
        google.maps.event.addDomListener(polygon, 'click', function (event) {
            var content = '<div class="cityBike"><div class="title"><h3>Parking Spot</h3><img id="polygon" src="img/directionIcon.png" alt="show direction icon" class="functionIcon" style="margin-right:10px;"><br><span>' + _this.stringHandler(type) + '</span><br>';
            geocoder.geocode({
                'latLng': markerPolygon.getPosition()
            }, function (result, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    content += result[0].formatted_address;
                }
                else {
                    console.log('Geocoder failed due to: ' + status);
                }
                _this.infowindowPolygon.setPosition(event.latLng);
                _this.infowindowPolygon.setContent(content);
                _this.infowindowPolygon.open(_this.map, polygon);
                var el = document.getElementById('polygon');
                google.maps.event.addDomListener(el, 'click', function () {
                    _this.showDirection(markerPolygon, false);
                });
            });
        });
    };
    MapComponent.prototype.clearMarkers = function () {
        this.markers.forEach(function (item, index) {
            item.setMap(null);
        });
        this.markers = [];
    };
    MapComponent.prototype.clearCircles = function () {
        this.circles.forEach(function (item, index) {
            item.setMap(null);
        });
    };
    MapComponent.prototype.clearPolygons = function () {
        this.polygons.forEach(function (item, index) {
            item.setMap(null);
        });
    };
    MapComponent.prototype.clearDirection = function () {
        this.directionArray.forEach(function (item, index) {
            item.setMap(null);
        });
    };
    MapComponent.prototype.clearKML = function () {
        this.kmlLayer.setMap(null);
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
                    /*this.placeCircle(this.centerLat,this.centerLon,this.circleRadius);*/
                    this.counter = 0;
                    this.facilitymarkers.forEach(function (item, index) {
                        item.setMap(null);
                    });
                    var mev = { latLng: new google.maps.LatLng(this.centerLat, this.centerLon) };
                    google.maps.event.trigger(this.map, 'click', mev);
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
            this.clearMarkers();
            this.clearDirection();
            var clickCoord = new location_1.Coords(event.latLng.lat(), event.latLng.lng());
            this.oldLat = event.latLng.lat();
            this.oldLong = event.latLng.lng();
            var tempMarker = this.placeMarker(event.latLng.lat(), event.latLng.lng());
            if (this.counter < 2) {
                this.clickUpdated.emit(clickCoord);
                this.placeCircle(this.centerLat, this.centerLon, this.circleRadius);
            }
            else {
            }
            this.oldRadius = this.circleRadius;
        }
        else {
            this.counter = 0;
        }
    };
    MapComponent.prototype.renderDirections = function (result, status, clearOldDirection, vehicle, suppressMarker) {
        if (clearOldDirection === void 0) { clearOldDirection = false; }
        if (vehicle === void 0) { vehicle = 'public'; }
        if (suppressMarker === void 0) { suppressMarker = false; }
        if (status == google.maps.DirectionsStatus.OK) {
            if (clearOldDirection) {
                this.clearDirection();
                document.getElementById('direction').innerHTML = '';
            }
            var colors = {
                car: {
                    color: '#FF6861'
                },
                public: {
                    color: '#779ECB'
                }
            };
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: this.map,
                suppressMarkers: suppressMarker,
                draggable: true,
                preserveViewport: true,
                polylineOptions: {
                    strokeColor: colors[vehicle].color
                }
            });
            if (vehicle == 'public') {
                directionsRenderer.setPanel(document.getElementById('direction'));
                document.getElementById('direction').style.display = "block";
            }
            this.directionArray.push(directionsRenderer);
            directionsRenderer.setDirections(result);
        }
    };
    MapComponent.prototype.showDirection = function (marker, multiDirection) {
        var _this = this;
        if (marker === void 0) { marker = null; }
        if (multiDirection === void 0) { multiDirection = true; }
        var current = new google.maps.LatLng(this.centerLat, this.centerLon);
        var parkCar;
        var chosenMarker;
        var min;
        var destination = marker.getPosition();
        var directionsService = new google.maps.DirectionsService;
        if (multiDirection) {
            if (JSON.parse(localStorage.getItem('carLocation')).location.coordinates[0][0][1] === null) {
                this.facilitymarkers.forEach(function (item, index) {
                    var temp = google.maps.geometry.spherical.computeDistanceBetween(item.getPosition(), current);
                    if (index == 0 || min > temp) {
                        min = temp;
                        chosenMarker = item;
                    }
                });
            }
            else {
                chosenMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(JSON.parse(localStorage.getItem('carLocation')).location.coordinates[0][0][1], JSON.parse(localStorage.getItem('carLocation')).location.coordinates[0][0][0]),
                    map: this.map,
                    visible: false
                });
            }
            this.facilitymarkers.forEach(function (item, index) {
                if (item != chosenMarker) {
                    item.setMap(null);
                }
            });
            parkCar = chosenMarker.getPosition();
            directionsService.route({
                origin: current,
                destination: parkCar,
                optimizeWaypoints: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING,
            }, function (result, status) {
                _this.renderDirections(result, status, true);
            });
            directionsService.route({
                origin: parkCar,
                destination: destination,
                optimizeWaypoints: true,
                travelMode: google.maps.DirectionsTravelMode.TRANSIT
            }, function (result, status) {
                _this.renderDirections(result, status);
            });
            directionsService.route({
                origin: current,
                destination: destination,
                optimizeWaypoints: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (result, status) {
                _this.renderDirections(result, status, false, 'car');
            });
        }
        else {
            directionsService.route({
                origin: current,
                destination: destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (result, status) {
                _this.renderDirections(result, status, true, 'car', true);
            });
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