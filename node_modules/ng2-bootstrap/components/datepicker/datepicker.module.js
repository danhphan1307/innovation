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
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var datepicker_inner_component_1 = require('./datepicker-inner.component');
var datepicker_component_1 = require('./datepicker.component');
var daypicker_component_1 = require('./daypicker.component');
var monthpicker_component_1 = require('./monthpicker.component');
var yearpicker_component_1 = require('./yearpicker.component');
var components_helper_service_1 = require('../utils/components-helper.service');
var DatepickerModule = (function () {
    function DatepickerModule() {
    }
    DatepickerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [datepicker_component_1.DatePickerComponent, datepicker_inner_component_1.DatePickerInnerComponent, daypicker_component_1.DayPickerComponent,
                monthpicker_component_1.MonthPickerComponent, yearpicker_component_1.YearPickerComponent],
            exports: [datepicker_component_1.DatePickerComponent, datepicker_inner_component_1.DatePickerInnerComponent, daypicker_component_1.DayPickerComponent, forms_1.FormsModule,
                monthpicker_component_1.MonthPickerComponent, yearpicker_component_1.YearPickerComponent],
            providers: [components_helper_service_1.ComponentsHelper]
        }), 
        __metadata('design:paramtypes', [])
    ], DatepickerModule);
    return DatepickerModule;
}());
exports.DatepickerModule = DatepickerModule;
