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
var localStorage_isSupported = (function () {
    try {
        var itemBackup = localStorage.getItem("");
        localStorage.removeItem("");
        localStorage.setItem("", itemBackup);
        if (itemBackup === null)
            localStorage.removeItem("");
        else
            localStorage.setItem("", itemBackup);
        return true;
    }
    catch (e) {
        return false;
    }
})();
var UserComponent = (function (_super) {
    __extends(UserComponent, _super);
    function UserComponent() {
        _super.apply(this, arguments);
    }
    UserComponent.prototype.ngOnInit = function () {
        this.state = 'close';
        if (localStorage_isSupported) {
            if (localStorage.getItem("carLocation") === null) {
                this.object.name.en = "You did not chose your car/bike location";
            }
            else {
                this.object = JSON.parse(localStorage.getItem('carLocation'));
            }
        }
        else {
            this.object.name.en = "Sorry, your browser does not support this function.";
        }
    };
    UserComponent.prototype.updateSave = function (event) {
        if (localStorage_isSupported) {
            this.object = event;
        }
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-component',
            animations: [
                core_1.trigger("animationBottomNav", [
                    core_1.state("open", core_1.style({ height: "70%" })),
                    core_1.state("close", core_1.style({ height: "0" })),
                    core_1.transition("open <=> close", core_1.animate("250ms")),
                ])
            ],
            template: "<div class=\"bottomDiv\" [@animationBottomNav]=\"state\">\n  <div class=\"locationPanel\"><img src=\"img/mapPin.png\" id=\"saveIcon\" alt=\"save icon\">Your car location:</div>\n  <div class=\"content\">{{this.object.name.en}}</div>\n  <div class=\"lovePanel\"><img src=\"img/mapPin.png\" id=\"saveIcon\" alt=\"save icon\">Love Bike Station</div>\n  <div class=\"content\">{{this.object.name.en}}</div>\n  </div>",
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], UserComponent);
    return UserComponent;
}(abstract_class_component_1.AbstractComponent));
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.panel.component.js.map