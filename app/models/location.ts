
export class Coords{
    lat: number;
    lon : number;

    constructor(lat: number, lon: number){
        this.lat = lat;
        this.lon = lon;
    }
}

export interface Location {
    testCoord : Coords;
    coordinates: number[];
    bbox: number[];
}