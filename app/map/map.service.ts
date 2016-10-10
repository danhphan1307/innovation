
import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import global = require('../globals');

import {Observable} from 'rxjs/Rx';
import {Marker} from '../marker/marker';

declare var google : any;
//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MapService{

    constructor(){

    }



    public showDirection(origin: any, destionation: any){
        var start = new google.maps.LatLng(this.coords.lat,this.coords.lon);
        var end = marker.getPosition();
        console.log(end.lat(),end.lng());
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        var directionsService = new google.maps.DirectionsService;
        directionsService.route(request, (result:any, status: string) => this.callback(result,status));
    }

    private callback(result:any, status: string){
        if (status == 'OK') {

            global.directionsDisplay.setDirections(result);
        };
    }

    public placeMarkers(lat: number, lon: number, map?: any): Marker{

         var m = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lon),

            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
         m.setMap(map);
         console.log(global.map)
         return new Marker(m.getIcon(),
          m.getPosition().lat(),
         m.getPosition().lng());

    }
}