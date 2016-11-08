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
var parking_zone_filter_service_1 = require('../shared/parking-zone-filter.service');
var model_enum_1 = require('../models/model-enum');
var ParkZoneComponent = (function () {
    function ParkZoneComponent(mapService, parkingFilterService) {
        this.mapService = mapService;
        this.parkingFilterService = parkingFilterService;
        this.markers = [];
        this.triggered = new core_1.EventEmitter();
    }
    ParkZoneComponent.prototype.ngOnInit = function () {
        this.triggered.emit(model_enum_1.ActiveComponent.PAIDZONE);
    };
    ParkZoneComponent.prototype.ngOnChanges = function () {
    };
    ParkZoneComponent.prototype.loadZones = function (pricingZone, map) {
        var _this = this;
        this.parkingFilterService.getParkingZone().subscribe(function (res) {
            _this.parkZones = res;
            _this.parkZones = res.filter(function (f) { return f.properties.sallittu_pysakointitapa == pricingZone; });
            var colorCode = "";
            switch (pricingZone) {
                case model_enum_1.PricingZoneEnum.PAID_1:
                    colorCode = model_enum_1.ColorCode.DoRucRo;
                    break;
                case model_enum_1.PricingZoneEnum.PAID_2:
                    colorCode = model_enum_1.ColorCode.MauNuocBien;
                    break;
                case model_enum_1.PricingZoneEnum.PAID_3:
                    colorCode = model_enum_1.ColorCode.TimQuyPhai;
                    break;
                case model_enum_1.PricingZoneEnum.PAID_4:
                    colorCode = model_enum_1.ColorCode.HongSenSua;
                    break;
                case model_enum_1.PricingZoneEnum.PAID_5:
                    colorCode = model_enum_1.ColorCode.MauDeoGiKhongBiet;
                    break;
                case model_enum_1.PricingZoneEnum.FREE_1:
                    colorCode = model_enum_1.ColorCode.XanhMatDiu;
                    break;
                case model_enum_1.PricingZoneEnum.FREE_2:
                    colorCode = model_enum_1.ColorCode.CamLoeLoet;
                    break;
            }
            for (var _i = 0, _a = _this.parkZones; _i < _a.length; _i++) {
                var z = _a[_i];
                if (z.geometry.type == "Polygon") {
                    //Draw the outbounds
                    map.placePolygon(z.geometry.coordinates[0], colorCode, z.properties.sallittu_pysakointitapa);
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
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ParkZoneComponent.prototype, "triggered", void 0);
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