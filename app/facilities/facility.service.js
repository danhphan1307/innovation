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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
//Requiered method
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
var FacilityService = (function () {
    function FacilityService(http) {
        this.http = http;
        this.facilityUrl = 'https://p.hsl.fi/api/v1/facilities';
    }
    //Get all facilities , for testing purpose only
    FacilityService.prototype.getAllFacilities = function () {
        return this.http.get(this.facilityUrl, { headers: this.getHeaders() })
            .map(this.extractData)
            .catch(this.handleError);
    };
    //Get facilites nearby, radius in meters
    FacilityService.prototype.getFaclitiesNearby = function (coords, radius) {
        var params = new http_1.URLSearchParams();
        var strParams = "POINT(" + String(coords.lon) + "+" + String(coords.lat) + ")";
        params.set('geometry', strParams);
        params.set('maxDistance', String(radius));
        var options = new http_1.RequestOptions({
            // Have to make a URLSearchParams with a query string
            search: params
        });
        return this.http.get(this.facilityUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FacilityService.prototype.extractData = function (res) {
        var body = res.json();
        return body.results || {};
    };
    FacilityService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    FacilityService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    FacilityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FacilityService);
    return FacilityService;
}());
exports.FacilityService = FacilityService;
//# sourceMappingURL=facility.service.js.map