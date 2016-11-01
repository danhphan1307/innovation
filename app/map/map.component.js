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
    function MapComponent(_router) {
        this._router = _router;
        this.centerLat = 0;
        this.centerLon = 0;
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            preserveViewport: true
        });
        this.markers = [];
        this.circles = [];
        this.centerUpdated = new core_1.EventEmitter();
        this.clickUpdated = new core_1.EventEmitter();
        //Polygons array
        this.polygons = [];
        this.saveUpdated = new core_1.EventEmitter();
        this.klmSrc = '../files/vyohykerajat_ETRS.kml';
        this.router = _router;
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
        //Add KLM layer
        this.displayKML(this.klmSrc, this.map);
        //Bind direction display to map
        this.directionsDisplay.setMap(this.map);
        this.centerMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.centerLat, this.centerLon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
        this.createEventListeners();
    };
    MapComponent.prototype.center = function () {
        this.map.panTo(new google.maps.LatLng(this.centerLat, this.centerLon));
    };
    MapComponent.prototype.placeMarker = function (lat, lon) {
        var _this = this;
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
        var zoomLevel = map.getZoom();
        if (zoomLevel < 14) {
            type = 'small';
        }
        else {
            type = 'large';
        }
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: this.map,
            icon: icons[type].icon
        });
        this.markers.push(marker);
        google.maps.event.addDomListener(map, 'zoom_changed', (function (marker) {
            return function () {
                var zoomLevel = map.getZoom();
                if (zoomLevel < 14) {
                    type = 'small';
                }
                else {
                    type = 'large';
                }
                marker.setIcon(icons[type].icon);
            };
        })(marker));
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
        var zoomLevel = map.getZoom();
        if (zoomLevel < 14) {
            type = 'small';
        }
        else {
            type = 'large';
        }
        for (var i = 0; i < f.length; i++) {
            var markerFacility = new google.maps.Marker({
                position: new google.maps.LatLng(f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0]),
                map: this.map,
                icon: icons[type].icon
            });
            this.markers.push(markerFacility);
            var func = (function (markerFacility, i) {
                google.maps.event.addListener(markerFacility, 'click', function () {
                    var content = '<div class="cityBike"><div class="title"><h3>Park and Ride</h3><img id="markerFacility" src="img/directionIcon.png" alt="show direction icon" class="functionIcon"><img src="img/pinSave.png" id="saveIcon" alt="save icon" class="functionIcon"><br><span>' + f[i].name.en + '</span><br>' + f[i].builtCapacity + '</div></div>';
                    infowindow.setContent(content);
                    infowindow.open(_this.map, markerFacility);
                    var el = document.getElementById('markerFacility');
                    google.maps.event.addDomListener(el, 'click', function () {
                        _this.showDirection(markerFacility);
                    });
                    var el2 = document.getElementById('saveIcon');
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
                    markerFacility.setIcon(icons[type].icon);
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
            var markerBike = new google.maps.Marker({
                position: new google.maps.LatLng(stations[i].y, stations[i].x),
                map: this.map,
                icon: icons[type].icon
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
    MapComponent.prototype.placePolygon = function (coordArray, colorCode) {
        var path = [];
        for (var i = 0; i < coordArray.length; i++) {
            path.push(new google.maps.LatLng(coordArray[i][1], coordArray[i][0]));
        }
        var polygon = new google.maps.Polygon({
            paths: path,
            strokeColor: colorCode,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0
        });
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
    MapComponent.prototype.callbackForShowDirection = function (result, status) {
        if (status == 'OK') {
            this.directionsDisplay.setDirections(result);
        }
        ;
    };
    MapComponent.prototype.displayKML = function (src, map) {
        var kmlLayer = new google.maps.KmlLayer(src, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map
        });
        google.maps.event.addListener(kmlLayer, 'click', function (event) {
            var content = event.featureData.infoWindowHtml;
            var testimonial = document.getElementById('capture');
            testimonial.innerHTML = content;
        });
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
            this.clearCircles();
            var clickCoord = new location_1.Coords(event.latLng.lat(), event.latLng.lng());
            this.oldLat = event.latLng.lat();
            this.oldLong = event.latLng.lng();
            //Clear from previous searches
            //Create new circle and notify parent view
            this.placeCircle(event.latLng.lat(), event.latLng.lng(), this.circleRadius);
            this.clickUpdated.emit(clickCoord);
            this.oldRadius = this.circleRadius;
        }
    };
    MapComponent.prototype.showDirection = function (marker) {
        var _this = this;
        if (marker === void 0) { marker = null; }
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
    ], MapComponent.prototype, "saveUpdated", void 0);
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map-gg',
            template: "\n    <div id=\"mapCanvas\" ></div>\n\n    ",
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map