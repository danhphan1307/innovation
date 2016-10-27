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
var bike_service_1 = require('./bike.service');
var marker_component_1 = require('../marker/marker.component');
var map_service_1 = require('../map/map.service');
var BikeComponent = (function () {
    function BikeComponent(bikeService, mapService) {
        this.bikeService = bikeService;
        this.mapService = mapService;
        this.title = 'Bike Station';
        this.markers = [];
        this.iconUrl = 'https://c8.staticflickr.com/6/5298/29373396503_72f744d420_t.jpg';
    }
    BikeComponent.prototype.ngOnInit = function () {
    };
    BikeComponent.prototype.ngOnChanges = function () {
        console.log("change in bike");
    };
    BikeComponent.prototype.loadBikeStations = function (mapComponent) {
        var _this = this;
        this.bikeService.getBikeStations()
            .subscribe(function (stations) {
            _this.stations = stations;
            for (var _i = 0, stations_1 = stations; _i < stations_1.length; _i++) {
                var s = stations_1[_i];
                mapComponent.placeMarker(s.y, s.x);
            }
        });
    };
    __decorate([
        core_1.ViewChild(marker_component_1.MarkerComponent), 
        __metadata('design:type', marker_component_1.MarkerComponent)
    ], BikeComponent.prototype, "markerComponent", void 0);
    BikeComponent = __decorate([
        core_1.Component({
            selector: 'my-bike',
            template: "",
            providers: [bike_service_1.BikeService, map_service_1.MapService]
        }), 
        __metadata('design:paramtypes', [bike_service_1.BikeService, map_service_1.MapService])
    ], BikeComponent);
    return BikeComponent;
}());
exports.BikeComponent = BikeComponent;
//# sourceMappingURL=bike.component.js.map