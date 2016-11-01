
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

//Does not make sense much now since they only indicate the free and paid zone
//Will udpate later for more clarification
export class PricingZoneEnum{
    static FREE_1: string = "ilmainen pitkaaikainen pysakointi";
    static FREE_2: string = "ilmainen lyhytaikainen pysakointi_Kayta pysakointikiekkoa";

    static PAID_1 :string = "maksullinen_pysakointialue";
    static PAID_2 : string = "kertamaksu_enint_1_tunti_ilman_asukas_tai_yritystunnusta";
    static PAID_3: string = "maksullinen_ma-pe_9-21_ilman_asukas_tai_yritystunnusta";
    static PAID_4: string = "maksullinen_pysakointilaitos_tai_alue";
    static PAID_5: string = "kertamaksu_enint_4_tuntia";
}
