
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
    icons = {
        small: {
            icon:  'img/parkingIconSmall.png'
        },
        large: {
            icon: 'img/parkingIconLarge.png'
        }
    }

    iconsBikeStation = {
        small: {
            icon:  'img/bikeStationIconSmall.png'
        },
        large: {
            icon: 'img/bikeStationIcon.png'
        }
    }

    iconsBike = {
        small: {
            icon:  'img/smallBike.png'
        },
        large: {
            icon: 'img/largeBike.png'
        }
    }
    iconsParkHere = {
        small: {
            icon:  'img/parkHereIconSmall.png'
        },
        large: {
            icon: 'img/parkHereIconLarge.png'
        }
    }
    

    url = "https://limitless-sea-28806.herokuapp.com/api/checkout";
    constructor(private http: Http){

    }

    showDirection(origin: Coords,marker: any, callback: (result:any, status:string) => void){
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
    getZoomLevel(_map:any):string{
        if(_map.getZoom()<13){
            return 'small';
        }else{
            return 'large';
        }
    }

    placeMarker( _map: any, _lat: number, _lon: number, _type:string): any{
        var _icon:any;
        var _zIndex:any = 0;
        var type=this.getZoomLevel(_map);

        if(_type=="bikestation"){
            _icon = this.iconsBikeStation[type].icon;
        }else if(_type=="carstation"){
            _icon = this.icons[type].icon;
        }else if(_type=="bike"){
            _icon = this.iconsBike[type].icon;
        }else if(_type=="park"){
            _zIndex = 2;
            _icon = this.iconsParkHere[type].icon;
        }else if(_type=="default"){
            _icon = null;
        }
        var temp_marker = new google.maps.Marker({
            position: new google.maps.LatLng(_lat, _lon),
            map: _map,
            icon: _icon,
            zIndex: _zIndex
        });

        google.maps.event.addDomListener(_map,'zoom_changed',()=>{
            type=this.getZoomLevel(_map);
            if(_type=="bikestation"){
                temp_marker.setIcon(this.iconsBikeStation[type].icon);
            }else if(_type=="carstation"){
                temp_marker.setIcon(this.icons[type].icon);
            }else if(_type=="bike"){
                temp_marker.setIcon(this.iconsBike[type].icon);
            }else if(_type=="park"){
                temp_marker.setIcon(this.iconsParkHere[type].icon);
            }else if(_type=="fefault"){
                temp_marker.setIcon(null);
            }
        });
        return temp_marker;
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