export interface Coords {
    lat: number;
    lon : number
}


export interface Location {
    testCoord : Coords;
    coordinates: number[];
    bbox: number[];
}