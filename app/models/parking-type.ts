
import {Coords} from './location'
export interface ParkingType{
    geometry: Geometries;
    properties: ParkingTypeProperties;
}

export interface Geometries{
    geometries: Polygon[];

}
export interface ParkingTypeProperties{
    X: number;
    Y: number;
    type: string;
    stroke: string;
    sallittu_pysakointitapa: string;
}


export interface Polygon{
    coordinates: [Coords[]] ;
    type: string;
}
