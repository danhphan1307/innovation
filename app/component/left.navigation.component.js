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
var LeftNavigation = (function (_super) {
    __extends(LeftNavigation, _super);
    function LeftNavigation() {
        _super.apply(this, arguments);
        this.radiusUpdated = new core_1.EventEmitter();
    }
    LeftNavigation.prototype.ngAfterViewInit = function () {
        this.mySlider = new Slider('#ex1', {
            formatter: function (value) {
                this.radius = value * 1000;
                return value + ' km';
            }
        });
        this.radius = Number(this.sliderIOS.nativeElement.value) * 1000;
        this.oldRadius = this.radius;
    };
    ;
    LeftNavigation.prototype.ReturnSliderValue = function () {
        this.radius = Number(this.sliderIOS.nativeElement.value) * 1000;
        this.radiusUpdated.emit(this.radius);
        if (this.radius != 0) {
            this.oldRadius = this.radius;
        }
        return this.radius;
    };
    LeftNavigation.prototype.SetliderValue = function (value) {
        if (this.radius != 0) {
            this.oldRadius = this.radius;
        }
        this.mySlider.setValue(value);
        this.radius = value * 1000;
        this.radiusUpdated.emit(this.radius);
    };
    __decorate([
        core_1.ViewChild('sliderIOS'), 
        __metadata('design:type', Object)
    ], LeftNavigation.prototype, "sliderIOS", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LeftNavigation.prototype, "radiusUpdated", void 0);
    LeftNavigation = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'left-nav',
            providers: [],
            animations: [
                core_1.trigger("animationLeftNav", [
                    core_1.state("open", core_1.style({ left: 0 })),
                    core_1.state("close", core_1.style({ left: "-70%" })),
                    core_1.transition("open <=> close", core_1.animate("200ms")),
                ])
            ],
            template: "\n  <div id=\"mySidenav\" class=\"sidenav\" [@animationLeftNav]=\"state\">\n  <img src=\"img/cog.png\" alt=\"config\" style=\"width:40%;display:block;margin:auto;margin-top:10%;\">\n  <table>\n  <tr>\n  <td>\n  <span class=\"glyphicon glyphicon-map-marker\" ></span>\n  </td>\n  <td>\n  Location Detect\n  </td>\n  <td>\n  <label class=\"switch\">\n  <input type=\"checkbox\">\n  <div class=\"sliderIOS round\"></div>\n  </label>\n  </td>\n  </tr>\n\n  <tr>\n  <td>\n  <img src=\"img/diameter.png\" alt=\"diameter of the search\"/>\n  </td>\n  <td colspan=\"2\">\n  Search Diameter - P&R\n  </td>\n  </tr>\n\n  <tr (click) = \"ReturnSliderValue()\">\n  <td class=\"special\" colspan=\"3\">\n  <input id=\"ex1\" #sliderIOS data-slider-id='ex1Slider' type=\"text\" value=\"1\" data-slider-min=\"0\" data-slider-max=\"5\" data-slider-step=\"0.1\" data-slider-value=\"1\"/>\n  </td>\n  </tr>\n  </table>\n\n\n  <div class=\"copyright\">\n  <hr style=\"margin-top:0;margin-bottom:0;\">\n  <img src=\"img/demo-logo-2.png\" alt=\"config\" style=\"width:40%;display:block;margin:2% auto;\">\n  <p>Version: 0.9.1<br>\n  \u00A9 Parking Group<br></p>\n  </div>\n  </div>\n  <script>\n\n});\n</script>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], LeftNavigation);
    return LeftNavigation;
}(abstract_class_component_1.AbstractComponent));
exports.LeftNavigation = LeftNavigation;
//# sourceMappingURL=left.navigation.component.js.map