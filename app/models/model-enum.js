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
var Usage = (function () {
    function Usage() {
    }
    Usage.PARK_AND_RIDE = "PARK_AND_RIDE";
    Usage.HSL_TRAVEL_CARD = "HSL_TRAVEL_CARD";
    Usage.COMMERCIAL = "COMMERCIAL";
    return Usage;
}());
exports.Usage = Usage;
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
var FacilityStatus = (function () {
    function FacilityStatus() {
    }
    FacilityStatus.IN_OPERATION = "IN_OPERATION";
    FacilityStatus.INACTIVE = "INACTIVE";
    FacilityStatus.TEMPORARILY_CLOSED = "TEMPORARILY_CLOSED";
    FacilityStatus.EXCEPTIONAL_SITUATION = "EXCEPTIONAL_SITUATION";
    return FacilityStatus;
}());
exports.FacilityStatus = FacilityStatus;
var PricingMethod = (function () {
    function PricingMethod() {
    }
    PricingMethod.PARK_AND_RIDE_247_FREE = "PARK_AND_RIDE_247_FREE";
    PricingMethod.CUSTOM = "CUSTOM";
    return PricingMethod;
}());
exports.PricingMethod = PricingMethod;
//Does not make sense much now since they only indicate the free and paid zone
//Will udpate later for more clarification
var PricingZoneEnum = (function () {
    function PricingZoneEnum() {
    }
    PricingZoneEnum.FREE_1 = "ilmainen pitkaaikainen pysakointi";
    PricingZoneEnum.FREE_2 = "ilmainen lyhytaikainen pysakointi_Kayta pysakointikiekkoa";
    PricingZoneEnum.PAID_1 = "maksullinen_pysakointialue";
    PricingZoneEnum.PAID_2 = "kertamaksu_enint_1_tunti_ilman_asukas_tai_yritystunnusta";
    PricingZoneEnum.PAID_3 = "maksullinen_ma-pe_9-21_ilman_asukas_tai_yritystunnusta";
    PricingZoneEnum.PAID_4 = "maksullinen_pysakointilaitos_tai_alue";
    PricingZoneEnum.PAID_5 = "kertamaksu_enint_4_tuntia";
    return PricingZoneEnum;
}());
exports.PricingZoneEnum = PricingZoneEnum;
//Convenient shorthand for color code in app
var ColorCode = (function () {
    function ColorCode() {
    }
    ColorCode.DoRucRo = "#FF0000";
    ColorCode.XanhMatDiu = "#0000FF";
    ColorCode.MauNuocBien = "#0000FF";
    ColorCode.CamLoeLoet = "#FFA500";
    ColorCode.TimQuyPhai = "#800080";
    ColorCode.HongSenSua = "#FF69B4";
    ColorCode.MauDeoGiKhongBiet = "#1E4B3B";
    return ColorCode;
}());
exports.ColorCode = ColorCode;
//Enum for switching between components
(function (ActiveComponent) {
    ActiveComponent[ActiveComponent["BIKE"] = 0] = "BIKE";
    ActiveComponent[ActiveComponent["PARKING"] = 1] = "PARKING";
    ActiveComponent[ActiveComponent["PAIDZONE"] = 2] = "PAIDZONE";
    ActiveComponent[ActiveComponent["FREEZONE"] = 3] = "FREEZONE";
    ActiveComponent[ActiveComponent["USER"] = 4] = "USER";
    ActiveComponent[ActiveComponent["LAYER"] = 5] = "LAYER";
})(exports.ActiveComponent || (exports.ActiveComponent = {}));
var ActiveComponent = exports.ActiveComponent;
//# sourceMappingURL=model-enum.js.map