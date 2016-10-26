
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Coords} from '../models/location';

declare var google: any;


@Component({
    moduleId: module.id,
    selector: 'map-gg',
    template: `
    <div id="mapCanvas" ></div>
    `,
    providers: []
})

export class MapComponent{

    centerLat: number = 0
    centerLon: number = 0
    map : any;
    centerMarker: any

    directionsDisplay = new google.maps.DirectionsRenderer;

    @Input()
    circleRadius: number;

    @Input()
    markers: any[] = [];

    @Input()
    circles: any[] = [];

    @Output()
    centerUpdated: any= new EventEmitter();

    @Output()
    clickUpdated: any= new EventEmitter();

    constructor(){

    }

    ngOnInit(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.createMap.bind(this));
        }
    }

    createMap(position: any): void{
        this.centerLat = position.coords.latitude;
        this.centerLon = position.coords.longitude;

        this.centerUpdated.emit( new Coords(this.centerLat,this.centerLon));

        var mapProp = {
            center: new google.maps.LatLng(this.centerLat, this.centerLon),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
        //Bind direction display to map

        this.directionsDisplay.setMap(this.map);

        this.centerMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.centerLat,this.centerLon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        this.createEventListeners();

    }

    placeMarker(lat: number, lon: number): void{
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });
        this.markers.push(marker);
       google.maps.event.addListener(marker,'click',() => this.showDirection(marker));
    }

    placeCircle(lat: number, lon: number, radius: number): void{
        this.circles.push(new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map: this.map,
            center: new google.maps.LatLng(lat,lon),
            radius: radius
          }));
    }

    //Private functions
    private createEventListeners(): void{
        this.map.addListener('click', (event: any) => this.callbackForMapClickEvent(event));
    }

    private callbackForMapClickEvent(event: any): void{
        let clickCoord:Coords = new Coords(event.latLng.lat(),event.latLng.lng());
        //Clear from previous searches
        this.clearMarkers()
        this.clearCircles();
        //Create new circle and notify parent view
        this.placeCircle(event.latLng.lat(),event.latLng.lng(),this.circleRadius);
        this.clickUpdated.emit(clickCoord);
    }

    private showDirection(marker: any){
        var start = new google.maps.LatLng(this.centerLat,this.centerLon);
        var end = marker.getPosition();

        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        var directionsService = new google.maps.DirectionsService;
        directionsService.route(request, (result:any, status: string) => this.callbackForShowDirection(result,status));
    }

    callbackForShowDirection(result:any, status: string){
        if (status == 'OK') {

            this.directionsDisplay.setDirections(result);
        };
    }

    private clearMarkers(){
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
    }

    private clearCircles(){
        for (var i = 0; i < this.circles.length; i++) {
          this.circles[i].setMap(null);
        }
    }

}