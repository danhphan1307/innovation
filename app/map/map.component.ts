import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Coords} from '../models/location';
import {Router} from '@angular/router';
import {MapService} from './map.service'
import {PricingZoneEnum,ColorCode, ActiveComponent} from '../models/model-enum'
import {ModalComponent} from '../component/modal.component'
import { CustomComponent }  from '../component/custom.component';
import {Help} from '../component/help.component';

/**
 * [localStorage_hasData check if there is any data in localStorage]
 */
 function localStorage_hasData() {
     try {
         if(JSON.parse(localStorage.getItem("carLocation")).name.en != "No data"){
             return true;
         }else {
             return false;
         }
     }
     catch (e) {
         return false;
     }
 };

 declare var google: any;

 @Component({
     selector: 'map-gg',
     template: `
     <modal-bootstrap (resultUpdated)="ParkOrNot($event)"></modal-bootstrap>
     <custom-bootstrap></custom-bootstrap>
     <help id="help"></help>
     <div id="mapCanvas" ></div>

     `,
     providers: [MapService]
 })

 export class MapComponent{
     //Service
     @ViewChild(ModalComponent)
     private modalComponent:ModalComponent;
     @ViewChild(CustomComponent)
     private customComponent:CustomComponent;
     @ViewChild(Help)
     private help:Help;

     service: MapService;
     router:Router;
     input:any;
     autocomplete:any;

     map:any;
     centerLat: number = 60.1712179;
     centerLon: number = 24.9418765;
     centerMarker: any;

     circles: any[] = [];
     parkMarker:any;
     facilitymarkersInit:any[] = [];
     facilitymarkers:any[] = [];
     directionArray:any[] = [];
     parkingObject:any;

     infowindowMainMarker = new google.maps.InfoWindow({disableAutoPan : true});
     infowindowFacility = new google.maps.InfoWindow();
     infowindowBike = new google.maps.InfoWindow();
     infowindowDestination = new google.maps.InfoWindow();
     infowindowParkPlace = new google.maps.InfoWindow();
     infowindowPolygon = new google.maps.InfoWindow();

     @Input()
     circleRadius: number;

     @Input()
     markers: any[] = [];

     @Output()
     doneLoading: any = new EventEmitter<boolean>();

     @Output()
     mapClicked: any = new EventEmitter<boolean>();

     @Output()
     saveUpdated: any= new EventEmitter();

     //Polygons for HRI data
     polygons: any[] =  [[],[],[],[],[]];

     klmSrc : String = 'https://sites.google.com/site/parkingappkml/kml/vyohykerajat_ETRS.kml';
     kmlLayer : any = new google.maps.KmlLayer(this.klmSrc, {
         suppressInfoWindows: true,
         preserveViewport: true

     });

     constructor(private _router: Router, private _mapService: MapService ) {
         this.router = _router;
         this.service = _mapService;
     }

     ngOnInit(){
         if (navigator.geolocation) {
             this.initialize();
             google.maps.event.addDomListener(window, "load", ()=>{
                 document.getElementById("gettingLocation").style.opacity = '1';
                 document.getElementById("gettingLocation").style.display = 'block';
                 navigator.geolocation.getCurrentPosition(this.createMap.bind(this), this.noGeolocation)
             });
         } else {
             this.geolocationNotSupported();
         }
         //Hacky way to prevent circular json in stripe checkout
         const _stringify: any = JSON.stringify;
         JSON.stringify = function (value: any, ...args: any[]) {
             if (args.length) {
                 return _stringify(value, ...args);
             } else {
                 return _stringify(value, function (key: any, value: any) {
                     if (value && key === 'zone' && value['_zoneDelegate']
                         && value['_zoneDelegate']['zone'] === value) {
                         return undefined;
                 }
                 return value;
             });
             }
         };
     }


    /**
     * [noGeolocation alert if user do not allow to access the geolocation]
     */
     noGeolocation() {
         document.getElementById("mapCanvas").innerHTML += '<div class="alert alert-danger" role="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Please enable Geolocation to use our service.</div>';
         document.getElementById("gettingLocation").style.opacity = '0';
         document.getElementById("gettingLocation").style.display = 'none';
     }

    /**
     * [geolocationNotSupported alert if browser does not support the geolocation]
     */
     geolocationNotSupported() {
         document.getElementById("mapCanvas").innerHTML += '<div class="alert alert-danger" role="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> This browser does not support Geolocation.</div>';
         document.getElementById("gettingLocation").style.opacity = '0';
         document.getElementById("gettingLocation").style.display = 'none';
     }

    /**
     * [initialize init the map without knowing the location => faster for user]
     */
     initialize():void {
         var mapProp = {
             center: new google.maps.LatLng(this.centerLat, this.centerLon),
             zoom: 10,
             mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
         this.input = /** @type {!HTMLInputElement} */(document.getElementById('search_input'));
         this.autocomplete = new google.maps.places.Autocomplete(this.input);
         this.autocomplete.bindTo('bounds', this.map);
         var container_input = /** @type {!HTMLInputElement} */(document.getElementById('input-group'));
         this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(container_input);
         var cog_icon = /** @type {!HTMLInputElement} */(document.getElementById('cog_icon'));
         this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(cog_icon);
         var filter = /** @type {!HTMLInputElement} */(document.getElementById('filter'));
         this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(filter);
         var help = /** @type {!HTMLInputElement} */(document.getElementById('help'));
         this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(help);
     }

    /**
     * [createMap callback of init function, this time we have position from geolocation]
     * @param {any} position [description]
     */
     createMap(position: any): void{
         this.centerLat = position.coords.latitude;
         this.centerLon = position.coords.longitude;
         var center = new google.maps.LatLng(this.centerLat, this.centerLon);
         this.map.panTo(center);
         var _map = this.map; // need this line to make sure that the map is loaded.
         this.centerMarker = this.service.placeMarker(this.map, this.centerLat, this.centerLon,"default");
         if (localStorage_hasData()) {
             this.parkMarker = this.placeParkPlace();
         }
         _map.addListener('click', ()=> {
             this.mapClicked.emit(true);
         });
         
         document.getElementById("gettingLocation").style.opacity = '0';
         setTimeout(()=>{
             document.getElementById("gettingLocation").style.display = 'none';
         },250);
         document.getElementById("carouselInstruction").style.opacity = '1';

        /*
        *Search bar
        */
        var marker = new google.maps.Marker({
            map: this.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        this.addListenerForMainMarker(this.centerMarker,this.infowindowMainMarker);
        this.autocomplete.addListener('place_changed',()=> {
            this.infowindowDestination.close();
            marker.setVisible(false);
            var place = this.autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            // If the place has a geometry, then present it on a map.
            _map.setCenter(place.geometry.location);

            marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            this.clearDirection();
            var address = '';
            if (place.address_components) {
                address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            var content = '<div class="searchInfo"><div class="title"><h3>'+ place.name + '</h3><br><span>'+address+ '</span><br><button style="width: 50%; margin-left: 25%;" id="markerSearch">Direction</button></div>' ;
            this.infowindowDestination.setContent(content);
            this.infowindowDestination.open(_map, marker);
            google.maps.event.addDomListener(document.getElementById('close_search'),'click',()=>{
                (<HTMLInputElement>document.getElementById('search_input')).value = '';
                this.infowindowDestination.close();
                marker.setVisible(false);
                this.clearDirection();
            });
            google.maps.event.addListener(marker, 'click', ()=>{
                this.infowindowDestination.open(_map, marker);
            });

            google.maps.event.addDomListener(document.getElementById('markerSearch'),'click',()=>{
                if(this.router.url == "/parkandride"){
                    this.showDirection(marker);
                } else {
                    this.showDirection(marker,false);
                }
            });
        });
        /*
        *End of Search bar
        */

        //Signal that map has done loading
        this.doneLoading.emit(true);
        if(this.circleRadius != 0){
            this.circles.push(this.service.placeCircle(this.map,this.circleRadius,this.centerLat,this.centerLon));
        }
    }

    /**
     * [addListenerForMainMarker add listener for main marker]
     * @param {any} _marker     [description]
     * @param {any} _infowindow [description]
     */
     addListenerForMainMarker(_marker:any, _infowindow:any){
         google.maps.event.addListener(_marker, 'click', ()=>{
             if(this.router.url == "/parking"){
                 var geocoder  = new google.maps.Geocoder();
                 geocoder.geocode({
                     'latLng': _marker.getPosition()
                 }, (result:any, status:any) =>{
                     if (status == google.maps.GeocoderStatus.OK) {
                         var content = '<div class="parkHere"><h3>Current Location</h3><br><span>'+result[0].formatted_address+'</span>';
                         content+='<hr class="separate"><button style="width: 50%; margin-left: 25%;" id="saveButton" type="button">Park here - 4€/h</button></div>' ;
                         _infowindow.setContent(content);
                         _infowindow.open(this.map, _marker);
                         google.maps.event.addDomListener(document.getElementById('saveButton'),'click',()=>{
                             this.modalComponent.showLgModal(4);
                             this.parkingObject = {
                                 "name":result[0].formatted_address,
                                 "marker":_marker,
                                 "saveButton":"saveButton",
                                 "infowindow":_infowindow,
                                 "unpark":"unpark"
                             };
                         });
                     } else {
                         console.log('Geocoder failed due to: ' + status);
                     }
                 });
             }
         });
     }

    /**
     * [ParkOrNot if user click the park place and decide park or not to park, this code will handle the logic]
     * @param {boolean} event [description]
     */
     ParkOrNot(event:boolean){
         if(event!=false){
             this.park("parkHere",this.markerToJSON(this.parkingObject.marker,this.parkingObject.name),this.parkingObject.saveButton,this.parkingObject.unpark,this.parkingObject.infowindow,false);
             this.parkingObject.infowindow.close();
         }else {
             this.parkingObject='';
         }
     }

    /**
     * [center go to the center of the map or any give lat lng]
     * @param {number =     this.centerLat} lat  [description]
     * @param {number =     this.centerLon} long [description]
     * @param {()=>void}  _func [description]
     */
     center(lat:number = this.centerLat,long:number = this.centerLon,  _func?:()=>void){
         this.map.panTo(new google.maps.LatLng(lat,long));
         if(_func){
             _func();
         }
     }

    /**
     * [clearFacilityMarkers remove all marker in park and ride]
     * @param {boolean = false} _init     [description]
     * @param {boolean = false} _pageLoad [description]
     */
     clearFacilityMarkers(_init:boolean = false, _pageLoad:boolean = false){
         if(_init){
             this.facilitymarkers.forEach((item, index) => {
                 item.setMap(null);
             });
             this.facilitymarkers=[];

         }
         if(_pageLoad){
             this.facilitymarkersInit.forEach((item, index) => {
                 item.setMap(null);
             });
             this.facilitymarkersInit=[];
         }
     }

    /**
     * [clearMarkers remove polygon's markers]
     */
     clearMarkers(){
         this.markers.forEach((item, index) => {
             item.setMap(null);
         });
         this.markers=[];
     }

    /**
     * [clearCircles remove circle]
     */
     clearCircles(){
         this.circles.forEach((item, index) => {
             item.setMap(null);
         });
     }

    /**
     * [clearPolygons remove polygon]
     */
     clearPolygons(){
         this.polygons.forEach((item, index) => {
             item.forEach((item2:any, index2:any)=>{
                 item2.setMap(null);
             })
         });
     }

    /**
     * [clearPolygonIndex remove specific polygon]
     * @param {number} _index [description]
     */
     clearPolygonIndex(_index:number){
         this.polygons[_index].forEach((item:any, index:any) => {
             item.setMap(null);
         });
     }

    /**
     * [clearDirection remove sketched direction]
     */
     clearDirection(){
         this.directionArray.forEach((item, index) => {
             item.setMap(null);
         });
     }

    /**
     * [clearKML remove KML layer]
     */
     clearKML(){
         this.kmlLayer.setMap(null);
     }

    /**
     * [displayKML show KML with call back]
     * @param {()=>void} _func [description]
     */
     displayKML(_func?:()=>void){
         this.kmlLayer.setMap(this.map);
         if(_func){
             _func();
         }
     }

    /**
     * [clickMainMarker use to trigger click event to show info window]
     */
     clickMainMarker(){
         if(localStorage_hasData()){
             var object = JSON.parse(localStorage.getItem('carLocation'));
             if(object.free){
                 google.maps.event.trigger(this.centerMarker, 'click');
             }
         }else{
             google.maps.event.trigger(this.centerMarker, 'click');
         }      
     }

    /**
     * [closeInfowindow close all info windows]
     */
     closeInfowindow(){
         this.infowindowMainMarker.close();
         this.infowindowFacility.close();
         this.infowindowBike.close();
         this.infowindowDestination.close();
         this.infowindowParkPlace.close();
         this.infowindowPolygon.close();
     }

    /**
     * [markerToJSON convert Google Marker object to JSON string]
     * @param  {any}    _marker [description]
     * @param  {string} _name   [description]
     * @return {any}            [description]
     */
     markerToJSON(_marker:any, _name:string):any{
         var temp:any = {
             "name": {
                 "fi": _name,
                 "sv": _name,
                 "en": _name,
             },"builtCapacity":{
                 "CAR": "No data",
                 "MOTORCYCLE": "No data",
                 "DISABLED": "No data",
                 "BICYCLE": "No data",
             },
             "location":{
                 "coordinates":[[[[_marker.getPosition().lng()],[_marker.getPosition().lat()]]]]
             },
             "free":false
         };
         return temp;
     }

    /**
     * [editLocalStorage edit localstorage base on new data]
     * @param {any} data [description]
     */
     editLocalStorage(data:any){
         if(localStorage_hasData()){
             var object = JSON.parse(localStorage.getItem('carLocation'));
             if(data.location.coordinates[0][0][1] != object.location.coordinates[0][0][1] || data.location.coordinates[0][0][0] != object.location.coordinates[0][0][0]){
                 localStorage.setItem('date',Date());
                 localStorage.setItem('carLocation',JSON.stringify(data));
                 this.saveUpdated.emit(data);
             }
         }else {
             localStorage.setItem('date',Date());
             localStorage.setItem('carLocation',JSON.stringify(data));
             this.saveUpdated.emit(data);
         }
     }

    /**
     * [resetLocalStorage reset the localstorage to default value]
     */
     resetLocalStorage(){
         var init_local_storage= {
             "name": {
                 "fi": "No data",
                 "sv": "No data",
                 "en": "No data"
             },"builtCapacity":{
                 "CAR": "No data",
                 "MOTORCYCLE": "No data",
                 "DISABLED": "No data",
                 "BICYCLE": "No data",
             },
             "location":{
                 "coordinates":[[[[0],[0]]]]
             },
             "free": true
         };
         localStorage.setItem('ticket',"No data");
         localStorage.setItem('date',"No data");
         localStorage.setItem('duration',"No data");
         localStorage.setItem('carLocation',JSON.stringify(init_local_storage));
         this.saveUpdated.emit(null);
     }

    /**
     * [Check if there is any data in localstorage or not, if there is , show it to the map]
     * @param {boolean = true} _free [description]
     */
     placeParkPlace(_free:boolean = true){
         if(this.parkMarker!== undefined){
             this.parkMarker.setMap(null);
         }
         if(localStorage_hasData()){
             //this.infowindowFacility.close();
             //this.infowindowMainMarker.close();
             var object = JSON.parse(localStorage.getItem('carLocation'));
             var markerPark = this.service.placeMarker(this.map,object.location.coordinates[0][0][1], object.location.coordinates[0][0][0], "park");
             this.parkMarker = markerPark;
             google.maps.event.addListener(markerPark, 'click', () => {
                 var content = '<div class="parkPlace"><div class="title"><h3>Your Park Place</h3><br><span>'+object.name.en+ '</span><br>';
                 if(object.name.en.indexOf('bike') !== -1){
                     content+='Bicycle Capacity :'+ (object.builtCapacity.BICYCLE||0);
                 } else {
                     content+='Car Capacity :'+ (object.builtCapacity.CAR|| 0)+'<br>';
                     content+='Disabled Capacity:'+ (object.builtCapacity.DISABLED|| 0)+'<br>';
                     content+='Motorbike Capacity:'+ (object.builtCapacity.MOTORCYCLE|| 0);
                 }
                 content+='<hr class="separate"><button id="markerFacility">Direction</button><button id="saveButton" class="active">You parked here</button><br><button id="unpark">Unpark</button></div></div>' ;
                 this.infowindowParkPlace.setContent(content);
                 this.infowindowParkPlace.open(this.map, markerPark);

                 google.maps.event.addDomListener(document.getElementById('markerFacility'),'click',()=>{
                     this.showDirection(markerPark,false);
                 });
                 google.maps.event.addDomListener(document.getElementById('unpark'),'click',()=>{
                     document.getElementById("saveButton").className = "";
                     document.getElementById("saveButton").innerHTML ="Park here";
                     if(!_free || (object.free!==undefined && !object.free)){
                         var a = localStorage.getItem('duration').split(':');
                         var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                         var amount = 400 *(seconds/3600);
                         this.service.openCheckout((amount>50)? amount : 50);
                     }
                     this.resetLocalStorage();
                     this.placeParkPlace(_free);
                 });
             });
             return markerPark;
         }
     }

    /**
     * [Each marker will handle different infowindow => different placemarker function.]
     * @param {any}           f    [description]
     * @param {boolean    =    true}        _free [description]
     * @param {boolean=false} _all [description]
     */
     placeMarkerFacility(f:any, _free:boolean = true, _all:boolean=false):void{
         var object:any;
         var cont:boolean = true;
         var markerFacility:any;
         if (localStorage_hasData()) { //if localstorage has item carLocation => the marker of this localstorage is not loaded yet = > loaded false
             object = JSON.parse(localStorage.getItem('carLocation'));
         }
         for (var i = 0; i < f.length; i++) {
             if(f[i].name.en.indexOf('bike') !== -1){
                 markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "bikestation");
             }else {
                 markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "carstation");
             }
             if(_all){
                 this.facilitymarkersInit.push(markerFacility);
             }else {
                 this.facilitymarkers.push(markerFacility);
             }
             var func = ((markerFacility, i) => {
                 google.maps.event.addListener(markerFacility, 'click', () => {
                     var content = '<div class="facility" ><div class="title"><h3>Park and Ride</h3><br><span>'+f[i].name.en+ '</span><br>';
                     if(f[i].name.en.indexOf('bike') !== -1){
                         content+='Bicycle Capacity :'+ (f[i].builtCapacity.BICYCLE||0);
                     } else {
                         content+='Car Capacity :'+ (f[i].builtCapacity.CAR|| 0)+'<br>';
                         content+='Disabled Capacity:'+ (f[i].builtCapacity.DISABLED|| 0)+'<br>';
                         content+='Motorbike Capacity:'+ (f[i].builtCapacity.MOTORCYCLE|| 0);
                     }
                     content+='<hr class="separate"><button id="markerFacility">Direction</button><button id="saveButton">Park here</button></div></div>' ;
                     this.infowindowFacility.setContent(content);
                     this.infowindowFacility.open(this.map, markerFacility);
                     google.maps.event.addDomListener(document.getElementById('markerFacility'),'click',()=>{
                         this.showDirection(markerFacility,false);
                     });
                     google.maps.event.addDomListener(document.getElementById('saveButton'),'click',()=>{
                         if(localStorage_hasData()){
                             var object_temp = JSON.parse(localStorage.getItem('carLocation'));
                             if( object_temp.free!== undefined && !object_temp.free){
                                 alert("Sorry you have to pay for your previous parking time first");
                             }else {
                                 this.park("facility", f[i],"saveButton","unpark",this.infowindowFacility);
                             }
                         }else {
                             this.park("facility", f[i],"saveButton","unpark",this.infowindowFacility);

                         }
                     });

                 });
             })(markerFacility, i);
         }
     }

    /**
     * [Each marker will handle different infowindow => different placemarker function.]
     * @param {any} stations [description]
     */
     placeMarkerBicycle(stations:any):void{
         var map = this.map;
         for (var i = 0; i < stations.length; i++) {
             var markerBike = this.service.placeMarker(this.map, stations[i].y, stations[i].x, "bike");
             this.markers.push(markerBike);
             var func = ((markerBike, i) => {
                 google.maps.event.addListener(markerBike, 'click', () => {
                     var content = '<div class="cityBike"><div class="title"><h3>Citybike Station</h3><br><span>'+stations[i].name+ '</span><h4 class="info"> Bike Available: '+stations[i].bikesAvailable + '/' +(stations[i].bikesAvailable+stations[i].spacesAvailable)+ '</h4></div>' ;
                     for (var counter = 0; counter < (stations[i].bikesAvailable); counter++) {
                         content+='<div class="freeBike">&nbsp;</div>';
                     }
                     for (var counter = 0; counter < (stations[i].spacesAvailable); counter++) {
                         content+='<div class="freeSpot">&nbsp;</div>';
                     }
                     content+='<hr class="separate"><button id="markerBike">Direction</button><button class="register"><a href="https://www.hsl.fi/citybike">Register to use</a></button><br><br><a href="https://www.hsl.fi/kaupunkipyorat" class="moreInfo"><span class="glyphicon glyphicon-info-sign"></span> More information</a></div>';
                     this.infowindowBike.setContent(content);
                     this.infowindowBike.open(this.map, markerBike);
                     var el = document.getElementById('markerBike');
                     google.maps.event.addDomListener(el,'click',()=>{
                         this.showDirection(markerBike,false);
                     });

                 });
             })(markerBike, i);
         }
     }

    /**
     * [Handle parking when user click park here]
     * @param {any}          _container          [description]
     * @param {any}          _newLocation        [description]
     * @param {string}       _elementIDForPark   [description]
     * @param {string}       _elementIDForUnpark [description]
     * @param {any}          _infoWindow         [description]
     * @param {boolean=true} _free               [description]
     */
     park(_container:any, _newLocation:any, _elementIDForPark:string,_elementIDForUnpark:string, _infoWindow:any, _free:boolean=true){
         this.editLocalStorage(_newLocation);
         document.getElementById(_elementIDForPark).className="active";
         document.getElementById(_elementIDForPark).innerHTML="You parked here";
         this.placeParkPlace(_free);
         if(document.getElementById(_elementIDForUnpark)==null){
             var node = document.createElement("button");
             node.setAttribute("id", _elementIDForUnpark);
             var textnode = document.createTextNode("Unpark");
             node.appendChild(textnode);
             document.getElementsByClassName(_container)[0].appendChild(node);
         }
         google.maps.event.addDomListener(document.getElementById(_elementIDForUnpark),'click',()=>{
             document.getElementById(_elementIDForPark).className = "";
             document.getElementById(_elementIDForPark).innerHTML ="Park here";

             this.resetLocalStorage();
             this.placeParkPlace(_free);
             _infoWindow.close();
         });
     }

    /**
     * [stringHandler description]
     * @param {string} input_string [description]
     */
     stringHandler(input_string:string) {
         return (input_string.charAt(0).toUpperCase() + input_string.slice(1)).replace(/_/g," ");
     }

    /**
     * [placePolygon description]
     * @param {any[]}     coordArray [description]
     * @param {string}    colorCode  [description]
     * @param {string =          "             "} type [description]
     * @param {any}       enumabcd   [description]
     */
     placePolygon(coordArray: any[], colorCode : string, type: string = " ", enumabcd : any){
         var path : any[] = [];
         var bounds = new google.maps.LatLngBounds();
         var geocoder  = new google.maps.Geocoder();
         for (var i=0; i< coordArray.length;i++){
             var temp = new google.maps.LatLng(coordArray[i][1],coordArray[i][0])
             path.push(temp);
             bounds.extend(temp);
         }
         var markerPolygon = this.service.placeMarker(this.map, bounds.getCenter().lat(), bounds.getCenter().lng(), "hiden");
         this.markers.push(markerPolygon);
         var polygon = this.service.placePolygon(this.map, path, colorCode);
         this.polygons[enumabcd].push(polygon);

         google.maps.event.addDomListener(polygon,'click',(event:any)=>{
             var content = '<div class="cityBike"><div class="title"><h3>Parking Spot</h3><br><span>'+this.stringHandler(type)+'</span><br>';
             geocoder.geocode({
                 'latLng': markerPolygon.getPosition()
             }, (result:any, status:any) =>{
                 if (status == google.maps.GeocoderStatus.OK) {
                     content+=result[0].formatted_address;
                     content+='<br><button id="polygon" style="margin-left:25%;width:50%">Direction</button>';
                 } else {
                     console.log('Geocoder failed due to: ' + status);
                 }
                 this.infowindowPolygon.setPosition(event.latLng);
                 this.infowindowPolygon.setContent(content);
                 this.infowindowPolygon.open(this.map, polygon);

                 var el = document.getElementById('polygon');
                 google.maps.event.addDomListener(el,'click',()=>{
                     this.showDirection(markerPolygon,false);
                 });
             });
         });
     }

    /**
     * [Indicate the entrance for the garrage.]
     * @param {Coords[]} coords [description]
     */
     placeMarkerEntrance(coords: Coords[]){
         var map = this.map;
         for (var i = 0; i < coords.length; i++) {
             var markerEntrance = this.service.placeMarker(this.map, coords[i].lat, coords[i].lon, "entrance");
             this.markers.push(markerEntrance);
             google.maps.event.addListener(markerEntrance, 'click', () => {
                 this.showDirection(markerEntrance,false);
             });
         }
     }

   /**
    * [Receive new radius from Emitter from filter panel]
    * @param {any} event [description]
    */
    updateRadius(event:any){
        this.circleRadius = event;
        if (this.centerLat != null && this.centerLon != null) {
            this.clearCircles();
            this.clearFacilityMarkers(true,false);
            this.circles.push(this.service.placeCircle(this.map,this.circleRadius,this.centerLat,this.centerLon));
        }
    }

   /**
    * [Handle event when user click show direction. It will cal function from map service.
    * At the beginning, it will check if user parked his/her car or not.
    * If not and in parkandride URL, it will automatically chose the nearest parking slot for the user.
    * If user parked already, it will only show the direction by public transportation.]
    * @param {any     = null} marker         [description]
    * @param {boolean = true} multiDirection [description]
    */
    private showDirection(marker: any = null, multiDirection:boolean = true){
        var current = new google.maps.LatLng(this.centerLat,this.centerLon);
        var parkCar:any ;
        var chosenMarker:any;
        var min:number;
        var destination = marker.getPosition();
        var geocoder  = new google.maps.Geocoder();

        if(multiDirection){
            if (!localStorage_hasData()) {
                this.facilitymarkers.forEach((item, index) => {
                    var temp = google.maps.geometry.spherical.computeDistanceBetween(item.getPosition(), current);
                    if(index==0 || min>temp){
                        min = temp;
                        chosenMarker = item;
                    }
                });
                new google.maps.event.trigger( chosenMarker, 'click' );
                geocoder.geocode({
                    'latLng': chosenMarker.getPosition()
                }, (result:any, status:any) =>{
                    if (status == google.maps.GeocoderStatus.OK) {
                        this.customComponent.showModal(result[0].formatted_address);
                    }
                });document.getElementById('saveButton').click();
            }else{
                chosenMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(JSON.parse(localStorage.getItem('carLocation')).location.coordinates[0][0][1], JSON.parse(localStorage.getItem('carLocation')).location.coordinates[0][0][0]),
                    map: this.map,
                    visible:false
                });
            }
            this.facilitymarkers.forEach((item, index) => {
                if(item.getPosition().lat()!=chosenMarker.getPosition().lat() || item.getPosition().lng()!=chosenMarker.getPosition().lng() ){
                    item.setMap(null);
                }
            });
            this.clearFacilityMarkers(false,true);

            parkCar = chosenMarker.getPosition();
            this.clearDirection();
            this.service.directionsService(this.map, current, parkCar, this.directionArray,'car',google.maps.DirectionsTravelMode.DRIVING);
            this.service.directionsService(this.map, parkCar, destination, this.directionArray,'public',google.maps.DirectionsTravelMode.TRANSIT);
            this.service.directionsService(this.map, current, destination, this.directionArray,'car',google.maps.DirectionsTravelMode.DRIVING,true);
        }else {
            this.clearDirection();

            this.service.directionsService(this.map, current, destination, this.directionArray,'car',google.maps.DirectionsTravelMode.DRIVING,true);

            this.service.directionsService(this.map, current, destination, this.directionArray,'public',google.maps.DirectionsTravelMode.TRANSIT);
        }
        this.help.updateSave('?saddr='+this.centerLat+','+this.centerLon +'&daddr='+destination.lat()+','+destination.lng());
    }
}