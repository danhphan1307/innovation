"use strict";
(function (CapacityType) {
    CapacityType[CapacityType["CAR"] = 0] = "CAR";
    CapacityType[CapacityType["DISABLED"] = 1] = "DISABLED";
    CapacityType[CapacityType["ELECTRIC_CAR"] = 2] = "ELECTRIC_CAR";
    CapacityType[CapacityType["MOTORCYCLE"] = 3] = "MOTORCYCLE";
    CapacityType[CapacityType["BICYCLE"] = 4] = "BICYCLE";
    CapacityType[CapacityType["BICYCLE_SECURE_SPACE"] = 5] = "BICYCLE_SECURE_SPACE";
})(exports.CapacityType || (exports.CapacityType = {}));
var CapacityType = exports.CapacityType;
(function (Usage) {
    Usage[Usage["PARK_AND_RIDE"] = 0] = "PARK_AND_RIDE";
    Usage[Usage["HSL_TRAVEL_CARD"] = 1] = "HSL_TRAVEL_CARD";
    Usage[Usage["COMMERCIAL"] = 2] = "COMMERCIAL";
})(exports.Usage || (exports.Usage = {}));
var Usage = exports.Usage;
(function (DayType) {
    DayType[DayType["BUSINESS_DAY"] = 0] = "BUSINESS_DAY";
    DayType[DayType["SATURDAY"] = 1] = "SATURDAY";
    DayType[DayType["SUNDAY"] = 2] = "SUNDAY";
})(exports.DayType || (exports.DayType = {}));
var DayType = exports.DayType;
(function (Service) {
    Service[Service["ELEVATOR"] = 0] = "ELEVATOR";
    Service[Service["TOILETS"] = 1] = "TOILETS";
    Service[Service["ACCESSIBLE_TOILETS"] = 2] = "ACCESSIBLE_TOILETS";
    Service[Service["LIGHTING"] = 3] = "LIGHTING";
    Service[Service["COVERED"] = 4] = "COVERED";
    Service[Service["SURVEILLANCE_CAMERAS"] = 5] = "SURVEILLANCE_CAMERAS";
    Service[Service["VENDING_MACHINE"] = 6] = "VENDING_MACHINE";
    Service[Service["INFORMATION_POINT"] = 7] = "INFORMATION_POINT";
    Service[Service["PAY_DESK"] = 8] = "PAY_DESK";
    Service[Service["CAR_WASH"] = 9] = "CAR_WASH";
    Service[Service["REPAIR_SHOP"] = 10] = "REPAIR_SHOP";
    Service[Service["SHOE_SHINE"] = 11] = "SHOE_SHINE";
    Service[Service["PAYMENT_AT_GATE"] = 12] = "PAYMENT_AT_GATE";
    Service[Service["UMBRELLA_RENTAL"] = 13] = "UMBRELLA_RENTAL";
    Service[Service["PARKING_SPACE_RESERVATION"] = 14] = "PARKING_SPACE_RESERVATION";
    Service[Service["ENGINE_IGNITION_AID"] = 15] = "ENGINE_IGNITION_AID";
    Service[Service["FIRST_AID"] = 16] = "FIRST_AID";
    Service[Service["STROLLER_RENTAL"] = 17] = "STROLLER_RENTAL";
    Service[Service["INFO_SCREENS"] = 18] = "INFO_SCREENS";
    Service[Service["BICYCLE_FRAME_LOCK"] = 19] = "BICYCLE_FRAME_LOCK";
})(exports.Service || (exports.Service = {}));
var Service = exports.Service;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["COINS"] = 0] = "COINS";
    PaymentMethod[PaymentMethod["NOTES"] = 1] = "NOTES";
    PaymentMethod[PaymentMethod["DEBIT_CARD"] = 2] = "DEBIT_CARD";
    PaymentMethod[PaymentMethod["VISA_ELECTRON"] = 3] = "VISA_ELECTRON";
    PaymentMethod[PaymentMethod["VISA_CREDIT"] = 4] = "VISA_CREDIT";
    PaymentMethod[PaymentMethod["AMERICAN_EXPRESS"] = 5] = "AMERICAN_EXPRESS";
    PaymentMethod[PaymentMethod["MASTERCARD"] = 6] = "MASTERCARD";
    PaymentMethod[PaymentMethod["DINERS_CLUB"] = 7] = "DINERS_CLUB";
    PaymentMethod[PaymentMethod["HSL_TRAVEL_CARD"] = 8] = "HSL_TRAVEL_CARD";
    PaymentMethod[PaymentMethod["OTHER"] = 9] = "OTHER";
})(exports.PaymentMethod || (exports.PaymentMethod = {}));
var PaymentMethod = exports.PaymentMethod;
(function (FacilityStatus) {
    FacilityStatus[FacilityStatus["IN_OPERATION"] = 0] = "IN_OPERATION";
    FacilityStatus[FacilityStatus["INACTIVE"] = 1] = "INACTIVE";
    FacilityStatus[FacilityStatus["TEMPORARILY_CLOSED"] = 2] = "TEMPORARILY_CLOSED";
    FacilityStatus[FacilityStatus["EXCEPTIONAL_SITUATION"] = 3] = "EXCEPTIONAL_SITUATION";
})(exports.FacilityStatus || (exports.FacilityStatus = {}));
var FacilityStatus = exports.FacilityStatus;
(function (PricingMethod) {
    PricingMethod[PricingMethod["PARK_AND_RIDE_247_FREE"] = 0] = "PARK_AND_RIDE_247_FREE";
    PricingMethod[PricingMethod["CUSTOM"] = 1] = "CUSTOM";
})(exports.PricingMethod || (exports.PricingMethod = {}));
var PricingMethod = exports.PricingMethod;
//# sourceMappingURL=model-enum.js.map