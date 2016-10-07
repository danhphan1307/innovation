
import { Component, OnInit} from '@angular/core';


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
    markers: any[] = [];

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

        var mapProp = {
            center: new google.maps.LatLng(this.centerLat, this.centerLon),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
        this.placeMarker(this.centerLat,this.centerLon);

    }

    placeMarker(lat: number, lon: number): void{
        this.markers.push( new google.maps.Marker({
            position: new google.maps.LatLng(lat,lon),
            map: this.map,
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }));

    }


}