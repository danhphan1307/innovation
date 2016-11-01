"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var abstract_class_component_1 = require('./abstract.class.component');
var BottomNavigation = (function (_super) {
    __extends(BottomNavigation, _super);
    function BottomNavigation() {
        _super.apply(this, arguments);
    }
    BottomNavigation = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bottom-nav',
            providers: [],
            template: "\n  <div class=\"bottomNav\">\n  <nav>\n  <ul>\n  \n  <li>\n  <a routerLink=\"abc\" routerLinkActive=\"active\"><img src=\"img/Free Parking-50.png\" alt=\"free parking\" class=\"custom-img-responsive\"></a>\n  </li>\n  <li>\n  <a routerLink=\"abc\" routerLinkActive=\"active\"><img src=\"img/Paid Parking-50.png\" alt=\"paid parking\"  class=\"custom-img-responsive\"></a>\n  </li>\n  <li>\n  <a routerLink=\"abc\" routerLinkActive=\"active\"><img src=\"img/Parking Zone-50.png\" alt=\"parking zone\"  class=\"custom-img-responsive\"></a>\n  </li>\n  <li>\n  <a routerLink=\"/parking\" routerLinkActive=\"active\"><img src=\"img/Park Ride-50.png\" alt=\"park ride\"  class=\"custom-img-responsive\"></a>\n  </li>\n  <li>\n  <a routerLink=\"/bike\" routerLinkActive=\"active\"><img src=\"img/Bicycle-50.png\" alt=\"bike icon\"  class=\"custom-img-responsive\"></a>\n  </li>\n  <li>\n  <a routeLink=\"/user\" routerLinkActive=\"active\" ><img id=\"testImg\" #testImg src=\"img/User-Info.png\" alt=\"user info\"  class=\"custom-img-responsive\"></a>\n  </li>\n  </ul>\n  </nav>\n  </div>\n\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BottomNavigation);
    return BottomNavigation;
}(abstract_class_component_1.AbstractComponent));
exports.BottomNavigation = BottomNavigation;
//# sourceMappingURL=bottom.navigation.component.js.map