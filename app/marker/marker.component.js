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
var map_service_1 = require('../map/map.service');
var marker_1 = require('./marker');
var MarkerComponent = (function () {
    function MarkerComponent(mapService, marker) {
        this.mapService = mapService;
        this.marker = marker;
    }
    MarkerComponent.prototype.ngOnInit = function () {
        this.createMarker();
    };
    MarkerComponent.prototype.createMarker = function () {
        this.map = new google.maps.Map(document.getElementById("mapCanvas"));
        this.mapService.placeMarkers(this.marker.lon, this.marker.lon, this.map);
    };
    MarkerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'marker-gg',
            template: "\n    <div id=\"mapCanvas\" ></div>\n    ",
            providers: [map_service_1.MapService]
        }), 
        __metadata('design:paramtypes', [map_service_1.MapService, marker_1.Marker])
    ], MarkerComponent);
    return MarkerComponent;
}());
exports.MarkerComponent = MarkerComponent;
//# sourceMappingURL=marker.component.js.map