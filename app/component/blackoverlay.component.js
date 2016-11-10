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
var BlackOverlay = (function (_super) {
    __extends(BlackOverlay, _super);
    function BlackOverlay() {
        _super.apply(this, arguments);
    }
    BlackOverlay = __decorate([
        core_1.Component({
            selector: 'blackoverlay',
            providers: [],
            animations: [
                core_1.trigger("animationBlackOverlay", [
                    core_1.state("open", core_1.style({ display: "block", opacity: 1 })),
                    core_1.state("close", core_1.style({ isplay: "none", opacity: 0 })),
                    core_1.transition("open <=> close", core_1.animate("1ms")),
                ])
            ],
            template: "\n  <div id=\"blackOverlay\" [@animationBlackOverlay]=\"state\" (click)=\"closeAnim()\">\n\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BlackOverlay);
    return BlackOverlay;
}(abstract_class_component_1.AbstractComponent));
exports.BlackOverlay = BlackOverlay;
//# sourceMappingURL=blackoverlay.component.js.map