
import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Coords} from '../models/location';
import {LeftNavigation} from '../component/left.navigation.component';
import {Router} from '@angular/router';

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
    router:Router;
    addItemStream:Observable<any>;
    centerLat: number = 0
    centerLon: number = 0
    map : any;
    centerMarker: any;

    oldLat:number
    oldLong:number
    oldRadius:number


    directionsDisplay = new google.maps.DirectionsRenderer({
        preserveViewport: true
    });

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

    constructor(private _router: Router ) {
        this.router = _router;
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
        var map = this.map;
        var type:string;
        var icons = {
            small: {
                icon:  'img/parkingIconSmall.png'
            },
            large: {
                icon: 'img/parkingIconLarge.png'
            }
        }
        var zoomLevel =  map.getZoom();
        if(zoomLevel<14){
            type = 'small';
        }else{
            type = 'large';
        }

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lon),
            map: this.map,
            icon: icons[type].icon
        });

        this.markers.push(marker);
        google.maps.event.addDomListener(map,'zoom_changed',(function(marker) {
            return function() {
                var zoomLevel =  map.getZoom();
                if(zoomLevel<14){
                    type = 'small';
                }else{
                    type = 'large';
                }
                marker.setIcon(icons[type].icon);
            }})(marker));

        google.maps.event.addListener(marker,'click',() => this.showDirection(marker));
    }
    placeMarkerBicycle(stations:any):void{
        var infowindow = new google.maps.InfoWindow();
        var map = this.map;
        var type:string;

        var icons = {
            small: {
                icon:  'img/smallBike.png'
            },
            large: {
                icon: 'img/largeBike.png'
            }
        }
        var zoomLevel =  map.getZoom();
        if(zoomLevel<14){
            type = 'small';
        }else{
            type = 'large';
        }
        for (var i = 0; i < stations.length; i++) {

            var markerBike = new google.maps.Marker({
                position: new google.maps.LatLng(stations[i].y, stations[i].x),
                map: this.map,
                icon: icons[type].icon
            });
            this.markers.push(markerBike);

            var func = ((markerBike, i) => {
                google.maps.event.addListener(markerBike, 'click', () => {
                    
                    var content = '<div class="cityBike"><div class="title"><h3>Citybike Station</h3><img id="markerBike" src="img/directionIcon.png" alt="love icon" class="directionIcon"><br><span>'+stations[i].name+ '</span><h4 class="info"> Bike Available: '+stations[i].bikesAvailable + '/' +(stations[i].bikesAvailable+stations[i].spacesAvailable)+ '</h4></div>' ;
                    for (var counter = 0; counter < (stations[i].bikesAvailable); counter++) {
                        content+='<div class="freeBike">&nbsp;</div>';
                    }
                    for (var counter = 0; counter < (stations[i].spacesAvailable); counter++) {
                        content+='<div class="freeSpot">&nbsp;</div>';
                    }
                    content+='<hr class="separate"><button class="register"><a href="https://www.hsl.fi/citybike">Register to use</a></button><br><br><a href="https://www.hsl.fi/kaupunkipyorat" class="moreInfo"><span class="glyphicon glyphicon-info-sign"></span> More information</a></div>';
                    infowindow.setContent(content);
                    infowindow.open(this.map, markerBike);
                    var el = document.getElementById('markerBike');
                    google.maps.event.addDomListener(el,'click',()=>{
                        this.showDirection(markerBike);
                    });

                });


                google.maps.event.addDomListener(map,'zoom_changed',()=>{
                    var zoomLevel =  map.getZoom();
                    if(zoomLevel<14){
                        type = 'small';
                    }else{
                        type = 'large';
                    }
                    markerBike.setIcon(icons[type].icon);
                });

            })(markerBike, i);
        }

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
        }
        else {
            if(this.oldRadius ==null){

            }
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
        if(this.router.url == "/parking"){

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
    }

    private showDirection(marker: any = null){
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