
import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Coords} from '../models/location';
import {LeftNavigation} from '../component/left.navigation.component';
import {Router} from '@angular/router';
import {MapService} from './map.service'
declare var google: any;

var localStorage_isSupported = (function () {
    try {
        var itemBackup = localStorage.getItem("");
        localStorage.removeItem("");
        localStorage.setItem("", itemBackup);
        if (itemBackup === null)
            localStorage.removeItem("");
        else
            localStorage.setItem("", itemBackup);
        return true;
    }
    catch (e) {
        return false;
    }
})();

@Component({
    moduleId: module.id,
    selector: 'map-gg',
    template: `
    <div id="mapCanvas" ></div>

    `,
    providers: [MapService]
})

export class MapComponent{
    //Service
    service: MapService;
    router:Router;
    addItemStream:Observable<any>;
    centerLat: number = 0
    centerLon: number = 0
    map : any;
    centerMarker: any;
    centerCoords : Coords = new Coords(0.0,0.0);


    oldLat:number
    oldLong:number
    oldRadius:number
    saveLocation:any;

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

    //Polygons array
    polygons : any[] = []
    @Output()
    saveUpdated: any= new EventEmitter();

    klmSrc : String = 'https://sites.google.com/site/lnknguyenmyfiles/kmlfiles/vyohykerajat_ETRS.kml';
    kmlLayer : any = new google.maps.KmlLayer(this.klmSrc, {
        suppressInfoWindows: true,
        preserveViewport: true

    });

    constructor(private _router: Router, private _mapService: MapService ) {
        this.router = _router;
        this.service = _mapService;
    }

    ngOnInit(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.createMap.bind(this));
        }
    }


    createMap(position: any): void{
        this.centerLat = position.coords.latitude;
        this.centerLon = position.coords.longitude;
        this.centerCoords = new Coords(this.centerLat,this.centerLon);

        this.centerUpdated.emit( new Coords(this.centerLat,this.centerLon));

        var mapProp = {
            center: new google.maps.LatLng(this.centerLat, this.centerLon),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);

        //Add KLM layer
        //this.displayKML(this.klmSrc,this.map);
        //Bind direction display to map

        this.directionsDisplay.setMap(this.map);

        this.centerMarker = new google.maps.Marker({
            position: new google.maps.LatLng(this.centerLat,this.centerLon),
            map: this.map,
            icon: "img/red-dot.png"
        });
        this.createEventListeners();
        this.service.geocodeTesting("Kilo");
    }


    center(lat:number = this.centerLat,long:number = this.centerLon):void{

        this.map.panTo(new google.maps.LatLng(lat,long));
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
        google.maps.event.addDomListener(map,'zoom_changed',(function(marker: any) {
            return function() {
                var zoomLevel =  map.getZoom();
                if(zoomLevel<14){
                    type = 'small';
                }else{
                    type = 'large';
                }
                marker.setIcon(icons[type].icon);
            }})(marker));

        google.maps.event.addListener(marker,'click',() => this.service.showDirection(this.centerCoords,marker,(result,status) => this.callbackForShowDirection(result,status));
    }

    placeMarkerFacility(f:any):void{
        var infowindow = new google.maps.InfoWindow();
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

        var iconsBike = {
            small: {
                icon:  'img/bikeStationIconSmall.png'
            },
            large: {
                icon: 'img/bikeStationIcon.png'
            }
        }
        var zoomLevel =  map.getZoom();
        if(zoomLevel<14){
            type = 'small';
        }else{
            type = 'large';
        }
        for (var i = 0; i < f.length; i++) {
            if(f[i].name.en.indexOf('bike') !== -1){
                var markerFacility = new google.maps.Marker({
                    position: new google.maps.LatLng(f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0]),
                    map: this.map,
                    icon: iconsBike[type].icon
                });
            }else {
                var markerFacility = new google.maps.Marker({
                    position: new google.maps.LatLng(f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0]),
                    map: this.map,
                    icon: icons[type].icon
                });
            }

            this.markers.push(markerFacility);

            var func = ((markerFacility, i) => {
                google.maps.event.addListener(markerFacility, 'click', () => {
                    var content = '<div class="cityBike"><div class="title"><h3>Park and Ride</h3><img id="markerFacility" src="img/directionIcon.png" alt="show direction icon" class="functionIcon"><img src="img/pinSave.png" id="saveIcon" alt="save icon" class="functionIcon"><br><span>'+f[i].name.en+ '</span><br>';
                    if(f[i].name.en.indexOf('bike') !== -1){
                        content+='Bicycle Capacity :'+ (f[i].builtCapacity.BICYCLE||0);
                    } else {
                        content+='Car Capacity :'+ (f[i].builtCapacity.CAR|| 0)+'<br>';
                        content+='Disabled Capacity:'+ (f[i].builtCapacity.DISABLED|| 0)+'<br>';
                        content+='Motorbike Capacity:'+ (f[i].builtCapacity.MOTORCYCLE|| 0);
                    }
                    content+='</div></div>' ;
                    infowindow.setContent(content);
                    infowindow.open(this.map, markerFacility);
                    var el = document.getElementById('markerFacility');
                    google.maps.event.addDomListener(el,'click',()=>{
                        this.service.showDirection(this.centerCoords,markerFacility,(result,status) => this.callbackForShowDirection(result,status));
                    });
                    var el2 = document.getElementById('saveIcon');
                    google.maps.event.addDomListener(el2,'click',()=>{
                        if(localStorage_isSupported){
                            localStorage.setItem('carLocation',JSON.stringify(f[i]));
                            this.saveLocation = f[i];
                            this.saveUpdated.emit(this.saveLocation);
                        }
                    });

                });
google.maps.event.addDomListener(map,'zoom_changed',()=>{
    var zoomLevel =  map.getZoom();
    if(zoomLevel<14){
        type = 'small';
    }else{
        type = 'large';
    }
    if(f[i].name.en.indexOf('bike') !== -1){
        markerFacility.setIcon(iconsBike[type].icon);
    }else{
        markerFacility.setIcon(icons[type].icon);
    }



});

})(markerFacility, i);
}
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

                var content = '<div class="cityBike"><div class="title"><h3>Citybike Station</h3><img id="markerBike" src="img/directionIcon.png" alt="love icon" class="functionIcon"><br><span>'+stations[i].name+ '</span><h4 class="info"> Bike Available: '+stations[i].bikesAvailable + '/' +(stations[i].bikesAvailable+stations[i].spacesAvailable)+ '</h4></div>' ;
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
                    this.service.showDirection(this.centerCoords,markerBike,(result,status) => this.callbackForShowDirection(result,status));
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
            strokeColor: '#4a6aa5',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map: this.map,
            center: new google.maps.LatLng(lat,lon),
            radius: radius
        }));
    }
}

placePolygon(coordArray: any[], colorCode : string){
    var path : any[] = []
    for (var i=0; i< coordArray.length;i++){
        path.push(new google.maps.LatLng(coordArray[i][1],coordArray[i][0]))
    }


    var polygon = new google.maps.Polygon({
        paths: path,
        strokeColor: colorCode,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0
    });
    polygon.setMap(this.map);
    this.polygons.push(polygon);
}

    //Remove all markers on map
    clearMarkers(){
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    }

    //Remove all circles on map
    clearCircles(){
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].setMap(null);
        }
    }

    //Remove all polygons on map
    clearPolygons(){
        for (var i = 0; i < this.polygons.length; i++) {
            this.polygons[i].setMap(null);
        }
    }

    //Remove KML layers
    clearKML(){
        this.kmlLayer.setMap(null);
    }

    callbackForShowDirection(result:any, status: string) {
        if (status == 'OK') {

            this.directionsDisplay.setDirections(result);
        };
    }


    displayKML(){
        this.kmlLayer.setMap(this.map);
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


}