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
var hub_service_1 = require('./hub.service');
var HubComponent = (function () {
    function HubComponent(hubService) {
        this.hubService = hubService;
        this.title = 'City bikes';
        // google maps zoom level
        this.zoom = 7;
        // initial center position for the map
        this.lat = 60.1699;
        this.lon = 24.9384;
    }
    HubComponent.prototype.ngOnInit = function () {
        this.loadBikeStations();
    };
    HubComponent.prototype.loadBikeStations = function () {
        var _this = this;
        this.hubService.getHubs()
            .subscribe(function (stations) { return _this.hubs = stations; });
    };
    HubComponent = __decorate([
        core_1.Component({
            selector: 'my-hub',
            styles: ["\n    .sebm-google-map-container {\n        height: 900px;\n    }\n    "],
            template: "\n    <h1>{{ title }}</h1>\n\n    <!-- this creates a google map on the page with the given lat/lng from -->\n    <!-- the component as the initial center of the map: -->\n\n    <sebm-google-map [latitude]=\"lat\" [longitude]=\"lon\" [zoom]=\"zoom\">\n    <sebm-google-map-marker [latitude]=\"lat\" [longitude]=\"lon\"></sebm-google-map-marker>\n    <sebm-google-map-marker *ngFor=\"let hub of hubss\"\n                [latitude]=\"hub.coordinator\"\n                [longitude]=\"hub.coordinator\"\n                 [label]=\"station.name\"></sebm-google-map-marker>\n    </sebm-google-map>\n\n    ",
            providers: [hub_service_1.HubService]
        }), 
        __metadata('design:paramtypes', [hub_service_1.HubService])
    ], HubComponent);
    return HubComponent;
}());
exports.HubComponent = HubComponent;
//# sourceMappingURL=hub.component.js.map