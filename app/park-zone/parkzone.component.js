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
var marker_component_1 = require('../marker/marker.component');
var map_service_1 = require('../map/map.service');
var parking_zone_filter_service_1 = require('../shared/parking-zone-filter.service');
var model_enum_1 = require('../models/model-enum');
var ParkZoneComponent = (function () {
    function ParkZoneComponent(mapService, parkingFilterService) {
        this.mapService = mapService;
        this.parkingFilterService = parkingFilterService;
        this.markers = [];
    }
    ParkZoneComponent.prototype.ngOnInit = function () {
    };
    ParkZoneComponent.prototype.ngOnChanges = function () {
    };
    ParkZoneComponent.prototype.loadZones = function (pricingZone, map) {
        var _this = this;
        this.parkingFilterService.getParkingZone().subscribe(function (res) {
            _this.paidZones = res;
            //filter park and ride + active
            _this.paidZones = res.filter(function (f) { return f.properties.sallittu_pysakointitapa == pricingZone; });
            // && f.geometry.type=="Polygon");
            var colorCode = "";
            if (pricingZone == (model_enum_1.PricingZoneEnum.PAID_1 || model_enum_1.PricingZoneEnum.PAID_2 || model_enum_1.PricingZoneEnum.PAID_3)) {
                colorCode = '#FF0000';
            }
            else {
                colorCode = '#0000FF';
            }
            for (var _i = 0, _a = _this.paidZones; _i < _a.length; _i++) {
                var z = _a[_i];
                if (z.geometry.type == "Polygon") {
                    //Draw the outbounds
                    map.placePolygon(z.geometry.coordinates[0], colorCode);
                }
                else if (z.geometry.type == "GeometryCollection") {
                    //Draw the Parking sign
                    var path1 = z.geometry.geometries[0].coordinates;
                    var path2 = z.geometry.geometries[1].coordinates;
                    map.placePolygon(path1[0], colorCode);
                    map.placePolygon(path1[1], colorCode);
                    map.placePolygon(path2[0], colorCode);
                    map.placePolygon(path2[1], colorCode);
                }
            }
        });
    };
    __decorate([
        core_1.ViewChild(marker_component_1.MarkerComponent), 
        __metadata('design:type', marker_component_1.MarkerComponent)
    ], ParkZoneComponent.prototype, "markerComponent", void 0);
    ParkZoneComponent = __decorate([
        core_1.Component({
            selector: 'park-zone',
            template: "",
            providers: [map_service_1.MapService, parking_zone_filter_service_1.ParkingZoneFilterService]
        }), 
        __metadata('design:paramtypes', [map_service_1.MapService, parking_zone_filter_service_1.ParkingZoneFilterService])
    ], ParkZoneComponent);
    return ParkZoneComponent;
}());
exports.ParkZoneComponent = ParkZoneComponent;
//# sourceMappingURL=parkzone.component.js.map