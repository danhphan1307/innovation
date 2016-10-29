
import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Coords} from '../models/location';
import {LeftNavigation} from '../component/left.navigation.component';

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

    addItemStream:Observable<any>;
    centerLat: number = 0
    centerLon: number = 0
    map : any;
    centerMarker: any

    oldLat:number
    oldLong:number
    oldRadius:number

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


    klmSrc : String = '../files/vyohykerajat_ETRS.kml';

    constructor() {
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
        //Add KLM layer
        this.displayKML(this.klmSrc,this.map);
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
        this.clearCircles();
        if(radius != 0){
            this.circles.push(new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                map: this.map,
                center: new google.maps.LatLng(lat,lon),
                radius: radius
            }));
        }
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

    callbackForShowDirection(result:any, status: string){
        if (status == 'OK') {
            this.directionsDisplay.setDirections(result);
        };
    }

    displayKML(src: String, map: any){
        var kmlLayer = new google.maps.KmlLayer(src, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map
        });

        google.maps.event.addListener(kmlLayer, 'click', function(event) {
            var content = event.featureData.infoWindowHtml;
            var testimonial = document.getElementById('capture');
            testimonial.innerHTML = content;
        });
    }

    updateRadius(event:any){
        this.circleRadius = event;
        if (this.oldLat == null ) {
        }else {
            if(this.oldRadius ==null){}
                else{
                    if(this.oldRadius!=event){
                        this.oldRadius = event;
                        this.clearCircles();
                        this.placeCircle(this.oldLat,this.oldLong,this.circleRadius);
                    }
                    
                }

            }
        }

        //Private functions
        private createEventListeners(): void{
            this.map.addListener('click', (event: any) => this.callbackForMapClickEvent(event));
        }

        private callbackForMapClickEvent(event: any): void{
            this.clearCircles();
            let clickCoord:Coords = new Coords(event.latLng.lat(),event.latLng.lng());
            this.oldLat = event.latLng.lat();
            this.oldLong = event.latLng.lng();
            //Clear from previous searches
            //Create new circle and notify parent view
            this.placeCircle(event.latLng.lat(),event.latLng.lng(),this.circleRadius);
            this.clickUpdated.emit(clickCoord);
            this.oldRadius = this.circleRadius;
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
    }