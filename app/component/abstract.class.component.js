"use strict";
var AbstractComponent = (function () {
    function AbstractComponent() {
        this.state = 'close';
    }
    AbstractComponent.prototype.setState = function (sState) {
        this.state = sState;
    };
    AbstractComponent.prototype.getState = function () {
        return this.state;
    };
    AbstractComponent.prototype.beginAnim = function () {
        //this.state = this.state === 'open' ? 'closed' : 'open';
        this.state = 'open';
    };
    //abstract closeAnim():void;
    AbstractComponent.prototype.closeAnim = function () {
        this.setState('close');
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
//# sourceMappingURL=abstract.class.component.js.map