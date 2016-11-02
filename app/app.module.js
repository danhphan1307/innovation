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
var platform_browser_1 = require('@angular/platform-browser');
var bike_service_1 = require('./bikes/bike.service');
var left_navigation_component_1 = require('./component/left.navigation.component');
var bottom_navigation_component_1 = require('./component/bottom.navigation.component');
var blackoverlay_component_1 = require('./component/blackoverlay.component');
var user_panel_component_1 = require('./component/user.panel.component');
var hub_component_1 = require('./hubs/hub.component');
var app_component_1 = require('./app.component');
var bike_component_1 = require('./bikes/bike.component');
var http_1 = require('@angular/http');
var core_2 = require('angular2-google-maps/core');
var map_component_1 = require('./map/map.component');
var map_service_1 = require('./map/map.service');
var facility_service_1 = require('./facilities/facility.service');
var parkzone_component_1 = require('./park-zone/parkzone.component');
var facility_component_1 = require('./facilities/facility.component');
var forms_1 = require('@angular/forms');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpModule, forms_1.FormsModule,
                ng2_bootstrap_1.Ng2BootstrapModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyC9xg4iGS-l2PLDIdLp1u3T9vCIMXIdVoE'
                }),
                app_routing_1.appRoutingProviders],
            declarations: [app_component_1.AppComponent,
                parkzone_component_1.ParkZoneComponent,
                hub_component_1.HubComponent,
                map_component_1.MapComponent,
                bike_component_1.BikeComponent,
                user_panel_component_1.UserComponent,
                facility_component_1.FacilityComponent,
                left_navigation_component_1.LeftNavigation,
                bottom_navigation_component_1.BottomNavigation,
                blackoverlay_component_1.BlackOverlay, app_routing_1.routing],
            providers: [facility_service_1.FacilityService,
                map_service_1.MapService, bike_service_1.BikeService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map