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
var BikeService = (function () {
    function BikeService(http) {
        this.http = http;
        this.bikeUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/bike_rental/';
    }
    BikeService.prototype.getBikeStations = function () {
        return this.http.get(this.bikeUrl, { headers: this.getHeaders() })
            .map(this.extractData)
            .catch(this.handleError);
    };
    BikeService.prototype.extractData = function (res) {
        var body = res.json();
        return body.stations || {};
    };
    BikeService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        return headers;
    };
    BikeService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    BikeService = __decorate([
        core_1.Injectable(),
        __metadata('design:paramtypes', [http_1.Http])
    ], BikeService);
    return BikeService;
}());
exports.BikeService = BikeService;
//# sourceMappingURL=bike.service.js.map