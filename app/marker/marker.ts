
export class Marker {

    icon: string;
    lat: number;
    lon: number;

    constructor(icon: string, lat: number, lon: number){
        this.icon = icon;
        this.lat = lat;
        this.lon = lon;
    }
}