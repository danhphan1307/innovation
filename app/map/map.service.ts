
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import global = require('../globals');
import {Observable} from 'rxjs/Rx';
import {Coords} from '../models/location';
declare var google : any;
//Requiered method
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()

export class MapService{
    /**
     * Icon for parking slot
     * @type {Object}
     */
     icons = {
         small: {
             icon:  'img/facilityCarIconSmall.png'
         },
         large: {
             icon: 'img/facilityCarIconLarge.png'
         }
     }

    /**
     * Icon for bike station
     * @type {Object}
     */
     iconsBikeStation = {
         small: {
             icon:  'img/cityBikeIconSmall.png'
         },
         large: {
             icon: 'img/facilityBikeIconLarge.png'
         }
     }
    /**
     * ????
     * @type {Object}
     */
     iconsBike = {
         small: {
             icon:  'img/cityBikeIconSmall.png'
         },
         large: {
             icon: 'img/cityBikeIconLarge.png'
         }
     }

    /**
     * Icon for park here button
     * @type {Object}
     */
     iconsParkHere = {
         small: {
             icon:  'img/parkHereIconSmall.png'
         },
         large: {
             icon: 'img/parkHereIconLarge.png'
         }
     }

    /**
     * Icon for entrance of garage
     * @type {Object}
     */
     iconEntrance ={
         small: {
             icon:  'img/entrance.png'
         },
         large: {
             icon:  'img/entrance.png'
         },
     }

     private url = "https://fabulous-backend-hsl-parking.herokuapp.com/api/checkout";
     private removeTicket = 'https://fabulous-backend-hsl-parking.herokuapp.com/api/ticket';
     constructor(private http: Http){

     }

    /**
     * [Show direction guide between 2 points]
     * @param {Coords}     origin [Starting point]
     * @param {any}        marker [Marker which represents destination]
     * @param {string) =>     void}        callback [Callback handler]
     */
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

    /**
     * [Adjust zoom level and marker size]
     * @param  {any}    _map [Map object]
     * @return {string}      [String to identify whether icons should be small or large]
     */
     getZoomLevel(_map:any):string{
         if(_map.getZoom()<13){
             return 'small';
         }else{
             return 'large';
         }
     }

    /**
     * [Place polygon on map]
     * @param  {any} _map   [Map object]
     * @param  {any} _path  [Array of coordinates]
     * @param  {any} _color [Stroke color]
     * @return {any}        [An instance of polygon]
     */
     placePolygon(_map:any, _path:any, _color:any):any{
         var polygon = new google.maps.Polygon({
             map:_map,
             paths: _path,
             strokeColor: _color,
             strokeOpacity: 0.8,
             strokeWeight: 2,
             fillOpacity: 0
         });
         return polygon;
     }

    /**
     * [Place circle on map]
     * @param  {any}    _map    [Map object]
     * @param  {number} _radius [Radius of circle]
     * @param  {number} _lat    [Latitude of center]
     * @param  {number} _lon    [Longitude of center]
     * @return {any}            [An instance of circle]
     */
     placeCircle(_map:any, _radius:number, _lat:number, _lon:number):any{
         var circle = new google.maps.Circle({
             strokeColor: '#4a6aa5',
             strokeOpacity: 0.8,
             strokeWeight: 1,
             map: _map,
             center: new google.maps.LatLng(_lat,_lon),
             radius: _radius
         });
         return circle;
     }

    /**
     * [Place marker on map]
     * @param  {any}    _map  [Map object]
     * @param  {number} _lat  [Latitude of marker]
     * @param  {number} _lon  [Longitude of marker]
     * @param  {string} _type [Name of icons]
     * @return {any}          [An instance of marker]
     */
     placeMarker( _map: any, _lat: number, _lon: number, _type:string): any{
         var _icon:any = null;
         var _zIndex:any = 0;
         var type=this.getZoomLevel(_map);
         var _visible = true;

         if(_type=="bikestation"){
             _icon = this.iconsBikeStation[type].icon;
         }else if(_type=="carstation"){
             _icon = this.icons[type].icon;
         }else if(_type=="bike"){
             _icon = this.iconsBike[type].icon;
         }else if(_type=="park"){
             _zIndex = 2;
             _icon = this.iconsParkHere['large'].icon;
         }else if(_type=="default"){
             _icon = "img/default.png"
         }else if(_type=="hiden"){
             _visible = false;
         }else if(_type=="entrance"){
             _icon = this.iconEntrance['large'].icon;
         }

         var temp_marker = new google.maps.Marker({
             position: new google.maps.LatLng(_lat, _lon),
             map: _map,
             icon: _icon,
             zIndex: _zIndex,
             visible:_visible,
             optimized: false
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
                 //temp_marker.setIcon(this.iconsParkHere[type].icon);
             }else if(_type=="default"){
                 //temp_marker.setIcon(null);
             }
         });
         return temp_marker;
     }

    /**
     * [Service for rendering direction]
     * @param  {any}        _map   [Map object]
     * @param  {any}        _start [Starting coordinates]
     * @param  {any}        _end   [Destionation coordinates]
     * @param  {any}        array  [description]
     * @param  {string  =      'public'}    _vehicle        [Transportation method]
     * @param  {any}        _mode  [description]
     * @param  {boolean =      false}       _suppressMarker [description]
     * @return {any}               [description]
     */
     directionsService(_map:any, _start:any, _end:any, array:any, _vehicle:string = 'public',_mode:any, _suppressMarker:boolean = false):any{
         var directionsService = new google.maps.DirectionsService;
         directionsService.route({
             origin: _start,
             destination: _end,
             optimizeWaypoints: true,
             travelMode: _mode,
         },(result:any, status:any) => {
             this.renderDirections(_map, result, status, array,_vehicle, _suppressMarker)
         });
     }

    /**
     * [renderDirections description]
     * @param  {any}     _map           [description]
     * @param  {any}     result         [description]
     * @param  {any}     status         [description]
     * @param  {any}     array          [description]
     * @param  {string}  vehicle        [description]
     * @param  {boolean} suppressMarker [description]
     * @return {any}                    [description]
     */
     renderDirections(_map:any, result:any,status:any,array:any, vehicle:string, suppressMarker:boolean):any{
         if ( status == google.maps.DirectionsStatus.OK ) {
             document.getElementById('help').style.display="block";
             var colors = {
                 car: {
                     color:  '#FF6861'
                 },
                 public: {
                     color: '#779ECB'
                 }
             }
             var directionsRenderer = new google.maps.DirectionsRenderer({
                 map:_map,
                 suppressMarkers: suppressMarker,
                 markerOptions:{visible:false},
                 draggable:true,
                 preserveViewport: true,
                 polylineOptions: {
                     strokeColor: colors[vehicle].color
                 }
             });
             directionsRenderer.setDirections(result);
             array.push(directionsRenderer);
             return directionsRenderer;
         }
     }

    /**
     * [Open checkout form]
     * @param {number} _amount [Ticket's fee]
     */
     public openCheckout(_amount:number) {
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
         var des = 'Payment for ticket ' +  localStorage.getItem('ticket');
         var amount = _amount;
         var handler = (<any>window).StripeCheckout.configure({
             key: 'pk_test_cq1ut4ba4Ftin2AAUVEGnRbn',
             locale: 'auto',
             currency: 'eur',
             token:  (token: any) => {
                 // You can access the token ID with `token.id`.
                 // Get the token ID to your server-side code for use.
                 this.http.post(this.url,{token,des,amount},options)
                 .subscribe(
                     response => {let body = response.json()
                         if(body.success){
                             let temp_url = this.removeTicket + des;
                             return this.http.delete(temp_url).map( (response) => {
                                 console.log(response);
                             });
                         }
                         return body.success || { }
                     },
                     error =>{console.log(error)}
                     )}
             });
         handler.open({
             name: 'Ticket',
             description: des,
             amount: _amount,
             customer: localStorage.getItem("customer")
         });
         /*
         (<HTMLInputElement>document.getElementById('card_number')).value= localStorage.getItem("credit");
         (<HTMLInputElement>document.getElementById('cc-exp')).value= localStorage.getItem("year");
         (<HTMLInputElement>document.getElementById('cc-csc')).value= localStorage.getItem("ccv");
         */
     }
 }