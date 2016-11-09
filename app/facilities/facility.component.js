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
var facility_service_1 = require('./facility.service');
var location_1 = require('../models/location');
var left_navigation_component_1 = require('../component/left.navigation.component');
var model_enum_1 = require('../models/model-enum');
var FacilityComponent = (function () {
    function FacilityComponent(facilityService) {
        this.facilityService = facilityService;
        this.triggered = new core_1.EventEmitter();
        this.center = new location_1.Coords(0.0, 0.0);
        this.mapClicked = new location_1.Coords(0.0, 0.0);
        this.markers = [];
        this.title = 'Park and Ride';
    }
    FacilityComponent.prototype.ngOnInit = function () {
        this.triggered.emit(model_enum_1.ActiveComponent.PARKING);
    };
    FacilityComponent.prototype.receiveCenterUpdated = function (event) {
        this.center.lat = event.lat;
        this.center.lon = event.lon;
    };
    FacilityComponent.prototype.receivedClick = function (mapComponent, event, radius) {
        this.map = mapComponent;
        this.coords = event;
        this.radius = radius;
        this.oldRadius = this.radius;
        this.loadFacilitiesNearby(mapComponent, event, radius);
    };
    FacilityComponent.prototype.updateRadius = function (event) {
        this.radius = event;
        if (this.coords == null) {
        }
        else {
            if (this.oldRadius != event) {
                this.map.clearMarkers();
                this.radius = event;
                this.oldRadius = this.radius;
                this.loadFacilitiesNearby(this.map, this.coords, this.radius);
            }
        }
    };
    FacilityComponent.prototype.loadFacilitiesNearby = function (mapComponent, coord, radius) {
        var _this = this;
        this.facilityService.getFaclitiesNearby(coord, radius)
            .subscribe(function (facilities) {
            //filter park and ride + active
            _this.facilities = facilities.filter(function (f) { return f.usages.indexOf(model_enum_1.Usage.PARK_AND_RIDE) != -1
                && f.status == model_enum_1.FacilityStatus.IN_OPERATION; });
            mapComponent.placeMarkerFacility(_this.facilities);
        });
    };
    __decorate([
        core_1.ViewChild(left_navigation_component_1.LeftNavigation), 
        __metadata('design:type', left_navigation_component_1.LeftNavigation)
    ], FacilityComponent.prototype, "leftNav", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FacilityComponent.prototype, "triggered", void 0);
    FacilityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'facility-component',
            template: "",
            providers: [facility_service_1.FacilityService]
        }), 
        __metadata('design:paramtypes', [facility_service_1.FacilityService])
    ], FacilityComponent);
    return FacilityComponent;
}());
exports.FacilityComponent = FacilityComponent;
//# sourceMappingURL=facility.component.js.map