export interface BikeStation {
    id : string;
    name: string;
    x: number;
    y: number;
    bikesAvailable: number;
    spacesAvailable: number;
    allowDropoff : boolean;
    realTimeData: boolean;
}