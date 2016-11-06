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
var left_navigation_component_1 = require('./component/left.navigation.component');
var map_component_1 = require('./map/map.component');
var bottom_navigation_component_1 = require('./component/bottom.navigation.component');
var blackoverlay_component_1 = require('./component/blackoverlay.component');
var facility_component_1 = require('./facilities/facility.component');
var user_panel_component_1 = require('./component/user.panel.component');
var bike_component_1 = require('./bikes/bike.component');
var parkzone_component_1 = require('./park-zone/parkzone.component');
var router_1 = require('@angular/router');
var model_enum_1 = require('./models/model-enum');
var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
        this.bMapDone = false;
        // google maps zoom level
        this.zoom = 14;
        // initial center position for the map
        this.lat = 60.1712179;
        this.long = 24.9418765;
        this.router = _router;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.getElementById('testImg').addEventListener('click', function () {
            _this.blackOverlay.setState('open');
            _this.UserComponent.setState('open');
        });
    };
    AppComponent.prototype.beginLeftNav = function () {
        this.leftNav.setState('open');
        this.blackOverlay.setState('open');
    };
    AppComponent.prototype.closeAll = function () {
        this.leftNav.setState('close');
        this.blackOverlay.setState('close');
        this.UserComponent.setState('close');
    };
    AppComponent.prototype.FacilityRoute = function (event) {
        if (this.router.url == "/parking") {
            this.FacilityComponent.receivedClick(this.MapComponent, event, this.leftNav.ReturnSliderValue());
            this.MapComponent.markers = this.FacilityComponent.markers;
        }
    };
    AppComponent.prototype.loadData = function (event) {
        //call only if map is completely loaded
        if (event == true) {
            this.bMapDone = true;
            this.bottomtNav();
        }
    };
    AppComponent.prototype.bottomtNav = function () {
        if (this.bMapDone == true) {
            document.getElementById('direction').style.display = "none";
            this.MapComponent.clearCircles();
            this.MapComponent.clearMarkers();
            this.MapComponent.clearPolygons();
            this.MapComponent.clearDirection();
            this.MapComponent.clearKML();
            if (this.router.url == "/parking") {
                this.displayParking();
                this.MapComponent.center();
            }
            else {
                if (this.router.url == "/bike") {
                    this.displayBikes();
                }
                if (this.router.url == "/paidzone") {
                    this.displayPaidZone();
                }
                if (this.router.url == "/freezone") {
                    this.displayFreeZone();
                }
                if (this.router.url == "/layer") {
                    this.displayLayer();
                }
                this.MapComponent.center(this.lat, this.long);
            }
        }
    };
    /* Methods for displaying markers*/
    //Display markers for bikes
    AppComponent.prototype.displayBikes = function () {
        this.leftNav.SetliderValue(0);
        this.BikeComponent.loadBikeStations(this.MapComponent);
        this.MapComponent.markers = this.BikeComponent.markers;
    };
    //Parking
    AppComponent.prototype.displayParking = function () {
        this.MapComponent.counter = 0;
        this.MapComponent.clearDirection();
        var mev = { latLng: new google.maps.LatLng(this.MapComponent.centerLat, this.MapComponent.centerLon) };
        google.maps.event.trigger(this.MapComponent.map, 'click', mev);
        this.leftNav.SetliderValue(this.leftNav.oldRadius / 1000);
        this.MapComponent.markers = this.FacilityComponent.markers;
    };
    //Layer for freezone
    AppComponent.prototype.displayFreeZone = function () {
        this.ZoneComponent.loadZones(model_enum_1.PricingZoneEnum.FREE_1, this.MapComponent);
        this.ZoneComponent.loadZones(model_enum_1.PricingZoneEnum.FREE_2, this.MapComponent);
    };
    //Layer for paid zones
    AppComponent.prototype.displayPaidZone = function () {
        this.ZoneComponent.loadZones(model_enum_1.PricingZoneEnum.PAID_1, this.MapComponent);
        this.ZoneComponent.loadZones(model_enum_1.PricingZoneEnum.PAID_2, this.MapComponent);
        this.ZoneComponent.loadZones(model_enum_1.PricingZoneEnum.PAID_3, this.MapComponent);
        this.ZoneComponent.loadZones(model_enum_1.PricingZoneEnum.PAID_4, this.MapComponent);
        this.ZoneComponent.loadZones(model_enum_1.PricingZoneEnum.PAID_5, this.MapComponent);
    };
    //Layer for parking area
    AppComponent.prototype.displayLayer = function () {
        this.MapComponent.displayKML();
    };
    //Set active component
    AppComponent.prototype.setStatus = function (event) {
        this.active = event;
    };
    __decorate([
        core_1.ViewChild(map_component_1.MapComponent), 
        __metadata('design:type', map_component_1.MapComponent)
    ], AppComponent.prototype, "MapComponent", void 0);
    __decorate([
        core_1.ViewChild(left_navigation_component_1.LeftNavigation), 
        __metadata('design:type', left_navigation_component_1.LeftNavigation)
    ], AppComponent.prototype, "leftNav", void 0);
    __decorate([
        core_1.ViewChild(bottom_navigation_component_1.BottomNavigation), 
        __metadata('design:type', bottom_navigation_component_1.BottomNavigation)
    ], AppComponent.prototype, "bottomNav", void 0);
    __decorate([
        core_1.ViewChild(blackoverlay_component_1.BlackOverlay), 
        __metadata('design:type', blackoverlay_component_1.BlackOverlay)
    ], AppComponent.prototype, "blackOverlay", void 0);
    __decorate([
        core_1.ViewChild(facility_component_1.FacilityComponent), 
        __metadata('design:type', facility_component_1.FacilityComponent)
    ], AppComponent.prototype, "FacilityComponent", void 0);
    __decorate([
        core_1.ViewChild(bike_component_1.BikeComponent), 
        __metadata('design:type', bike_component_1.BikeComponent)
    ], AppComponent.prototype, "BikeComponent", void 0);
    __decorate([
        core_1.ViewChild(user_panel_component_1.UserComponent), 
        __metadata('design:type', user_panel_component_1.UserComponent)
    ], AppComponent.prototype, "UserComponent", void 0);
    __decorate([
        core_1.ViewChild(parkzone_component_1.ParkZoneComponent), 
        __metadata('design:type', parkzone_component_1.ParkZoneComponent)
    ], AppComponent.prototype, "ZoneComponent", void 0);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map