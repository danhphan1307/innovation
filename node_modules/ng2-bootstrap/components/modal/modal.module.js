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
var modal_backdrop_component_1 = require('./modal-backdrop.component');
var modal_component_1 = require('./modal.component');
var components_helper_service_1 = require('../utils/components-helper.service');
var ModalModule = (function () {
    function ModalModule() {
    }
    ModalModule = __decorate([
        core_1.NgModule({
            declarations: [modal_backdrop_component_1.ModalBackdropComponent, modal_component_1.ModalDirective],
            exports: [modal_backdrop_component_1.ModalBackdropComponent, modal_component_1.ModalDirective],
            entryComponents: [modal_backdrop_component_1.ModalBackdropComponent],
            providers: [components_helper_service_1.ComponentsHelper]
        }), 
        __metadata('design:paramtypes', [])
    ], ModalModule);
    return ModalModule;
}());
exports.ModalModule = ModalModule;
