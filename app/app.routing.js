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
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var parkzone_component_1 = require('./park-zone/parkzone.component');
var bike_component_1 = require('./bikes/bike.component');
var user_panel_component_1 = require('./component/user.panel.component');
var facility_component_1 = require('./facilities/facility.component');
var appRoutes = [
    { path: '',
        redirectTo: '/parking',
        pathMatch: 'full' },
    { path: 'parking', component: facility_component_1.FacilityComponent },
    { path: 'bike', component: bike_component_1.BikeComponent },
    { path: 'user', component: user_panel_component_1.UserComponent },
    { path: 'paidzone', component: parkzone_component_1.ParkZoneComponent },
    { path: 'freezone', component: parkzone_component_1.ParkZoneComponent }
];
//export const appRoutingProviders: any[] = [];
//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
var appRoutingProviders = (function () {
    function appRoutingProviders() {
    }
    appRoutingProviders = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(appRoutes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], appRoutingProviders);
    return appRoutingProviders;
}());
exports.appRoutingProviders = appRoutingProviders;
exports.routing = [app_component_1.AppComponent, facility_component_1.FacilityComponent, bike_component_1.BikeComponent, user_panel_component_1.UserComponent, parkzone_component_1.ParkZoneComponent];
//# sourceMappingURL=app.routing.js.map