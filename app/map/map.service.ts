
import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import global = require('../globals');

import {Observable} from 'rxjs/Rx';
import {Marker} from '../marker/marker';
import {Coords} from '../models/location';
declare var google : any;
//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MapService{

    //url = "https://limitless-sea-28806.herokuapp.com/api/checkout";
    url = "https://limitless-sea-28806.herokuapp.com/api/checkout";
    constructor(private http: Http){

    }

    public showDirection(origin: Coords,marker: any, callback: (result:any, status:string) => void){
        var start = new google.maps.LatLng(origin.lat,origin.lon);
        var end = marker.getPosition();
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        var directionsService = new google.maps.DirectionsService;
        directionsService.route(request, (result:any, status: string) => callback(result,status));
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

    public geocodeTesting(address: string){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': 'Kilonrinne'}, function(res: any,status: any){
            if (status == google.maps.GeocoderStatus.OK){
                console.log(res)
            }
        })
    }

    public openCheckout() {
        let header = new Headers();

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_cq1ut4ba4Ftin2AAUVEGnRbn',
            locale: 'auto',
            currency: 'eur',
            token:  (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.http.post(this.url,{token},options)
        .subscribe(
            res=>{console.log(res);},
            error =>{console.log(error)}
            )}
    });

        handler.open({
            name: 'Ticket',
            description: 'Payment for ticket',
            amount: 400
        });

    }
}