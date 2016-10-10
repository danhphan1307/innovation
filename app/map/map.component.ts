
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
    @Input()
    circleRadius: number;

    @Input()
    markers: any[] = [];

    @Input()
    circles: any[] = [];

    @Output()
    centerUpdated = new EventEmitter();

    @Output()
    clickUpdated = new EventEmitter();

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

        this.centerUpdated.emit(
            new Coords(this.centerLat,this.centerLon)

            );

        var mapProp = {
            center: new google.maps.LatLng(this.centerLat, this.centerLon),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
        this.centerMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.centerLat,this.centerLon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });

        this.createEventListeners();

    }

    placeMarker(lat: number, lon: number): void{
        this.markers.push( new google.maps.Marker({
            position: new google.maps.LatLng(lat,lon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }));

    }

    placeCircle(lat: number, lon: number, radius: number): void{
        this.circles.push(new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            center: new google.maps.LatLng(lat,lon),
            radius: radius
          }));
    }

    clearMarkers(){
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
    }

    clearCircles(){
        for (var i = 0; i < this.circles.length; i++) {
          this.circles[i].setMap(null);
        }
    }
    createEventListeners(): void{
        this.map.addListener('click', (event) => this.callbackForClickEvent(event));
    }

    callbackForClickEvent(event): void{
        let clickCoord = new Coords(event.latLng.lat(),event.latLng.lng());
        //Clear from previous searches
        this.clearMarkers()
        this.clearCircles();
        //Create new circle and notify parent view
        this.placeCircle(event.latLng.lat(),event.latLng.lng(),this.circleRadius);
        this.clickUpdated.emit(clickCoord);
    }

}