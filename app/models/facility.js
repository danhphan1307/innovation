"use strict";
var Facility = (function () {
    function Facility(info) {
        this.id = info.id;
        this.name = info.name;
        this.operatorId = info.operatorId;
        this.status = info.status;
        this.statusDescription = info.statusDescription;
        this.pricingMethod = info.pricingMethod;
        this.builtCapacity = info.builtCapacity;
        this.usages = info.usages;
    }
    return Facility;
}());
exports.Facility = Facility;
//# sourceMappingURL=facility.js.map