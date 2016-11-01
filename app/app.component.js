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
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(_router) {
        this._router = _router;
        // google maps zoom level
        this.zoom = 14;
        // initial center position for the map
        this.lat = 60.1699;
        this.lon = 24.9384;
        this.iconUrl = '../img/largeBike.png';
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
    AppComponent.prototype.bottomtNav = function () {
        this.MapComponent.clearMarkers();
        if (this.router.url == "/bike") {
            this.leftNav.SetliderValue(0);
            this.BikeComponent.loadBikeStations(this.MapComponent);
            this.MapComponent.markers = this.BikeComponent.markers;
        }
        if (this.router.url == "/parking") {
            this.leftNav.SetliderValue(this.leftNav.oldRadius / 1000);
            if (this.oldEvent == null) { }
            else {
                this.FacilityComponent.receivedClick(this.MapComponent, this.oldEvent, this.leftNav.ReturnSliderValue());
            }
            this.MapComponent.markers = this.FacilityComponent.markers;
        }
    };
    AppComponent.prototype.closeAll = function () {
        this.leftNav.setState('close');
        this.blackOverlay.setState('close');
        this.UserComponent.setState('close');
    };
    AppComponent.prototype.FacilityRoute = function (event) {
        if (this.router.url == "/parking") {
            this.oldEvent = event;
            this.MapComponent.clearMarkers();
            this.FacilityComponent.receivedClick(this.MapComponent, event, this.leftNav.ReturnSliderValue());
            this.MapComponent.markers = this.FacilityComponent.markers;
        }
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