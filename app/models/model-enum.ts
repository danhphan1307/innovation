
export enum CapacityType {
    "CAR",
    "DISABLED",
    "ELECTRIC_CAR",
    "MOTORCYCLE",
    "BICYCLE",
    "BICYCLE_SECURE_SPACE"
}

export class Usage {
    static PARK_AND_RIDE: string = "PARK_AND_RIDE";
    static HSL_TRAVEL_CARD: string ="HSL_TRAVEL_CARD";
    static COMMERCIAL:string = "COMMERCIAL"
}

export enum DayType{
    "BUSINESS_DAY",
    "SATURDAY",
    "SUNDAY"
}

export enum Service {
    "ELEVATOR",
    "TOILETS",
    "ACCESSIBLE_TOILETS",
    "LIGHTING",
    "COVERED",
    "SURVEILLANCE_CAMERAS",
    "VENDING_MACHINE",
    "INFORMATION_POINT",
    "PAY_DESK",
    "CAR_WASH",
    "REPAIR_SHOP",
    "SHOE_SHINE",
    "PAYMENT_AT_GATE",
    "UMBRELLA_RENTAL",
    "PARKING_SPACE_RESERVATION",
    "ENGINE_IGNITION_AID",
    "FIRST_AID",
    "STROLLER_RENTAL",
    "INFO_SCREENS",
    "BICYCLE_FRAME_LOCK"
}

export enum PaymentMethod {
    "COINS",
    "NOTES",
    "DEBIT_CARD",
    "VISA_ELECTRON",
    "VISA_CREDIT",
    "AMERICAN_EXPRESS",
    "MASTERCARD",
    "DINERS_CLUB",
    "HSL_TRAVEL_CARD",
    "OTHER"
}

export class FacilityStatus {
    static IN_OPERATION: string = "IN_OPERATION";
    static INACTIVE: string = "INACTIVE";
    static TEMPORARILY_CLOSED: string = "TEMPORARILY_CLOSED";
    static EXCEPTIONAL_SITUATION:string = "EXCEPTIONAL_SITUATION";
}

export class PricingMethod {
    static PARK_AND_RIDE_247_FREE: string ="PARK_AND_RIDE_247_FREE";
    static CUSTOM: string = "CUSTOM";
}

