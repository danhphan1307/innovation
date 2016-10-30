

export interface ParkingType{
    geometry: any;
    properties: ParkingTypeProperties;
}

export interface ParkingTypeProperties{
    X: number;
    Y: number;
    type: string;
}