
import {Coords} from './location'
export interface ParkingType{
    geometry: Geometry;
    properties: ParkingTypeProperties;
}

export interface ParkingTypeProperties{
    X: number;
    Y: number;
    type: string;
    stroke: string;
    sallittu_pysakointitapa: string;
}


export interface Geometry{
    coordinates: any[] ;
    type: string;
    geometries: Geometry[];
}
