import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Coords} from '../models/location';
import {LeftNavigation} from '../component/left.navigation.component';
import {Router} from '@angular/router';
import {MapService} from './map.service'
import {PricingZoneEnum,ColorCode, ActiveComponent} from '../models/model-enum'
import {GoogleService} from '../google/google.service'
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

var localStorage_hasData = (function () {
    try {
        if(localStorage_isSupported){
            if(localStorage.getItem("carLocation") !== null){
                return true;
            }else {
                return false;
            }
        } else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
})();

@Component({
    selector: 'map-gg',
    template: `
    <div id="mapCanvas" ></div>

    `,
    providers: [MapService,GoogleService]
})

export class MapComponent{
    //Service
    service: MapService;
    googleService: GoogleService;
    router:Router;
    addItemStream:Observable<any>;
    centerLat: number = 0
    centerLon: number = 0
    map:any;
    centerMarker: any;
    centerCoords : Coords = new Coords(0.0,0.0);

    oldLat:number
    oldLong:number
    oldRadius:number
    saveLocation:any;
    counter:number=0;
    that:any;

    parkMarker:any;
    facilitymarkers:any[] = [];
    directionArray:any[] = [];

    infowindowPolygon = new google.maps.InfoWindow({
        maxWidth: 200
    });
    infowindow = new google.maps.InfoWindow();
    infowindowBike = new google.maps.InfoWindow();

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

    @Output()
    doneLoading: any = new EventEmitter<boolean>();

    //Polygons array
    polygons: any[] =  [[],[],[],[],[]];

    @Output()
    saveUpdated: any= new EventEmitter();

    klmSrc : String = 'https://sites.google.com/site/lnknguyenmyfiles/kmlfiles/vyohykerajat_ETRS.kml';
    kmlLayer : any = new google.maps.KmlLayer(this.klmSrc, {
        suppressInfoWindows: true,
        preserveViewport: true

    });
    constructor(private _router: Router, private _mapService: MapService,  private _googleService: GoogleService ) {
        this.router = _router;
        this.service = _mapService;
        this.googleService = _googleService;
    }
    ngOnInit(){
        if (navigator.geolocation) {
            google.maps.event.addDomListener(window, "load", ()=>{
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

    noGeolocation() {
        document.getElementById("mapCanvas").innerHTML = '<div class="alert alert-danger" role="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Please enable Geolocation to use our service.</div>';
    }

    geolocationNotSupported() {
        document.getElementById("mapCanvas").innerHTML = '<div class="alert alert-danger" role="alert"> <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> This browser does not support Geolocation.</div>';
    }

    createMap(position: any): void{
        this.centerLat = position.coords.latitude;
        this.centerLon = position.coords.longitude;
        this.centerCoords = new Coords(this.centerLat,this.centerLon);
        this.centerUpdated.emit(this.centerCoords);

        var mapProp = {
            center: new google.maps.LatLng(this.centerLat, this.centerLon),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
        var _map = this.map;
        this.centerMarker = this.service.placeMarker(this.map, this.centerLat, this.centerLon,"default");
        this.createEventListeners();
        //Search bar
        var input = /** @type {!HTMLInputElement} */(
            document.getElementById('search_input'));

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', this.map);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: this.map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed',()=> {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                _map.fitBounds(place.geometry.viewport);
            } else {
                _map.setCenter(place.geometry.location);
            }
            marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            var content = '<div class="cityBike"><div class="title"><h3>'+ place.name + '</h3><img id="markerSearch" src="img/directionIcon.png" alt="direction icon" class="functionIcon"><br><span>'+address+ '</span></div>' ;
            infowindow.setContent(content);
            infowindow.open(_map, marker);
            var el = document.getElementById('markerSearch');
            google.maps.event.addDomListener(el,'click',()=>{
                this.showDirection(marker,false);
            });
        });


        //End of Search bar
        //Signal that map has done loading
        this.doneLoading.emit(true);
        this.clickUpdated.emit(this.centerCoords);
        this.clearCircles();
        if(this.circleRadius != 0){
            this.circles.push(this.service.placeCircle(this.map,this.circleRadius,this.centerLat,this.centerLon));
        }
        if(localStorage_hasData){
            this.parkMarker = this.placeParkPlace();
        }
    }


    center(lat:number = this.centerLat,long:number = this.centerLon):void{
        this.map.panTo(new google.maps.LatLng(lat,long));
    }
    clearFacilityMarkers(){
        this.facilitymarkers.forEach((item, index) => {
            item.setMap(null);
        });
        this.facilitymarkers=[];
    }
    clearMarkers(){
        this.markers.forEach((item, index) => {
            item.setMap(null);
        });
        this.markers=[];
    }
    clearCircles(){
        this.circles.forEach((item, index) => {
            item.setMap(null);
        });
    }
    clearPolygons(){
        this.polygons.forEach((item, index) => {
            item.forEach((item2:any, index2:any)=>{
                item2.setMap(null);
            })
        });
    }
    clearPolygonIndex(_index:number){
        this.polygons[_index].forEach((item:any, index:any) => {
            item.setMap(null);
        });
    }
    clearDirection(){
        this.directionArray.forEach((item, index) => {
            item.setMap(null);
        });
    }

    clearKML(){
        this.kmlLayer.setMap(null);
    }

    displayKML(){
        this.kmlLayer.setMap(this.map);
    }

    editLocalStorage(data:any){
        if(localStorage_hasData){
            var object = JSON.parse(localStorage.getItem('carLocation'));
            if(data.location.coordinates[0][0][1] != object.location.coordinates[0][0][1] || data.location.coordinates[0][0][0] != object.location.coordinates[0][0][0]){
                var temp = data;
                temp.date=Date();
                localStorage.setItem('carLocation',JSON.stringify(temp));
                this.saveLocation = data;
                this.saveUpdated.emit(this.saveLocation);
            } 
        }else {
            var temp = data;
            temp.date=Date();
            localStorage.setItem('carLocation',JSON.stringify(temp));
            this.saveLocation = data;
            this.saveUpdated.emit(this.saveLocation);
        }

    }
    removeLocalStorage(){
        localStorage.removeItem('carLocation');
        this.saveUpdated.emit(null);
        localStorage_hasData = false;
    }

    placeParkPlace(){
        if(this.parkMarker!== undefined){
            this.parkMarker.setMap(null);
        }
        if(localStorage_hasData){
            var object = JSON.parse(localStorage.getItem('carLocation'));
            var markerPark = this.service.placeMarker(this.map,object.location.coordinates[0][0][1], object.location.coordinates[0][0][0], "park");
            this.parkMarker = markerPark;
            google.maps.event.addListener(markerPark, 'click', () => {
                var content = '<div class="cityBike"><div class="title"><h3>Park and Ride</h3><img id="markerFacility" src="img/directionIcon.png" alt="show direction icon" class="functionIcon" style="margin-right:10px;"><br><span>'+object.name.en+ '</span><br>';
                if(object.name.en.indexOf('bike') !== -1){
                    content+='Bicycle Capacity :'+ (object.builtCapacity.BICYCLE||0);
                } else {
                    content+='Car Capacity :'+ (object.builtCapacity.CAR|| 0)+'<br>';
                    content+='Disabled Capacity:'+ (object.builtCapacity.DISABLED|| 0)+'<br>';
                    content+='Motorbike Capacity:'+ (object.builtCapacity.MOTORCYCLE|| 0);
                }
                content+='<hr class="separate"><button id="saveButton" class="active">You parked here</button><br><button id="unpark">Unpark</button></div></div>' ;
                this.infowindow.setContent(content);
                this.infowindow.open(this.map, markerPark);
                google.maps.event.addDomListener(document.getElementById('markerFacility'),'click',()=>{
                    this.showDirection(markerPark,false);
                });
                google.maps.event.addDomListener(document.getElementById('unpark'),'click',()=>{
                    if(localStorage_isSupported){
                        document.getElementById("saveButton").className = "";
                        document.getElementById("saveButton").innerHTML ="Park here";
                        localStorage_hasData = false;
                        this.removeLocalStorage();
                        this.placeParkPlace();
                    }
                });
            });
            return markerPark;
        } 
    }

    placeMarkerFacility(f:any):void{
        var object:any;
        var cont:boolean = true;
        var markerFacility:any;
        if (localStorage_hasData) { //if localstorage has item carLocation => the marker of this localstorage is not loaded yet = > loaded false
            object = JSON.parse(localStorage.getItem('carLocation'));
        }
        for (var i = 0; i < f.length; i++) {
            if (localStorage_hasData) {
                if(object.location.coordinates[0][0][1] != f[i].location.coordinates[0][0][1] || object.location.coordinates[0][0][0] != f[i].location.coordinates[0][0][0]){
                    if(f[i].name.en.indexOf('bike') !== -1){
                        markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "bikestation");
                    }else {
                        markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "carstation");
                    }
                }else {
                    if(f[i].name.en.indexOf('bike') !== -1){
                        markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "bikestation");
                    }else {
                        markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "carstation");
                    }
                }
            }else {
                if(f[i].name.en.indexOf('bike') !== -1){
                    markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "bikestation");
                }else {
                    markerFacility = this.service.placeMarker(this.map, f[i].location.coordinates[0][0][1], f[i].location.coordinates[0][0][0], "carstation");
                }
            }
            this.facilitymarkers.push(markerFacility);
            var func = ((markerFacility, i) => {
                google.maps.event.addListener(markerFacility, 'click', () => {
                    var content = '<div class="cityBike"><div class="title"><h3>Park and Ride</h3><img id="markerFacility" src="img/directionIcon.png" alt="show direction icon" class="functionIcon" style="margin-right:10px;"><br><span>'+f[i].name.en+ '</span><br>';
                    if(f[i].name.en.indexOf('bike') !== -1){
                        content+='Bicycle Capacity :'+ (f[i].builtCapacity.BICYCLE||0);
                    } else {
                        content+='Car Capacity :'+ (f[i].builtCapacity.CAR|| 0)+'<br>';
                        content+='Disabled Capacity:'+ (f[i].builtCapacity.DISABLED|| 0)+'<br>';
                        content+='Motorbike Capacity:'+ (f[i].builtCapacity.MOTORCYCLE|| 0);
                    }
                    if (localStorage_hasData) {
                        if( JSON.parse(localStorage.getItem('carLocation')).name.en==f[i].name.en){
                            content+='<hr class="separate"><button id="saveButton" class="active">You parked here</button><<br><button id="unpark">Unpark</button></div></div>' ;
                            google.maps.event.addDomListener(document.getElementById('unpark'),'click',()=>{
                                if(localStorage_isSupported){
                                    document.getElementById("saveButton").className = "";
                                    document.getElementById("saveButton").innerHTML ="Park here";
                                    this.removeLocalStorage();
                                    this.placeParkPlace();
                                }
                            });
                        }else{
                            content+='<hr class="separate"><button id="saveButton">Park here</button></div></div>' ;
                        }
                    } else {
                        content+='<hr class="separate"><button id="saveButton">Park here</button></div></div>' ;
                    }
                    this.infowindow.setContent(content);
                    this.infowindow.open(this.map, markerFacility);
                    google.maps.event.addDomListener(document.getElementById('markerFacility'),'click',()=>{
                        this.showDirection(markerFacility,false);
                    });
                    google.maps.event.addDomListener(document.getElementById('saveButton'),'click',()=>{
                        if(localStorage_isSupported){
                            this.editLocalStorage(f[i]);
                            localStorage_hasData = true;
                            document.getElementById("saveButton").className="active";
                            document.getElementById("saveButton").innerHTML="You parked here";
                            if(document.getElementById("unpark")==null){
                                var node = document.createElement("button");
                                node.setAttribute("id", "unpark");
                                var textnode = document.createTextNode("Unpark");
                                node.appendChild(textnode);
                                document.getElementsByClassName("cityBike")[0].appendChild(node);
                            }
                            this.placeParkPlace();
                            google.maps.event.addDomListener(document.getElementById('unpark'),'click',()=>{
                                if(localStorage_isSupported){
                                    document.getElementById("saveButton").className = "";
                                    document.getElementById("saveButton").innerHTML ="Park here";
                                    this.removeLocalStorage();
                                    this.placeParkPlace();
                                    this.infowindow.close();
                                }
                            });
                        }
                    });

                });
            })(markerFacility, i);
        }
    }

    placeMarkerBicycle(stations:any):void{
        var map = this.map;
        for (var i = 0; i < stations.length; i++) {
            var markerBike = this.service.placeMarker(this.map, stations[i].y, stations[i].x, "bike");
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

    stringHandler(input_string:string) {
        return (input_string.charAt(0).toUpperCase() + input_string.slice(1)).replace(/_/g," ");
    }

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
            var content = '<div class="cityBike"><div class="title"><h3>Parking Spot</h3><img id="polygon" src="img/directionIcon.png" alt="show direction icon" class="functionIcon" style="margin-right:10px;"><br><span>'+this.stringHandler(type)+'</span><br>';
            geocoder.geocode({
                'latLng': markerPolygon.getPosition()
            }, (result:any, status:any) =>{
                if (status == google.maps.GeocoderStatus.OK) {
                    content+=result[0].formatted_address;
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
                content += '<img id="payment" src="img/heart.png" alt="show payment icon" class="functionIcon" style="margin-right:10px;">';
                this.infowindowPolygon.setPosition(event.latLng);
                this.infowindowPolygon.setContent(content);
                this.infowindowPolygon.open(this.map, polygon);

                var el = document.getElementById('polygon');
                google.maps.event.addDomListener(el,'click',()=>{
                    this.showDirection(markerPolygon,false);
                });

                var pay = document.getElementById('payment');
                google.maps.event.addDomListener(pay,'click',()=>{
                    this.service.openCheckout();
                });
            });
        });
    }

    updateRadius(event:any){
        this.circleRadius = event;
        if (this.oldLat == null ) {
        }
        else {
            if(this.oldRadius!=event){
                this.counter=0;
                this.oldRadius = event;
                this.clearCircles();
                this.clearFacilityMarkers();
                var mev={latLng: new google.maps.LatLng(this.centerLat, this.centerLon)};
                google.maps.event.trigger(this.map, 'click', mev);
            }
        }
    }

    //Private functions
    private createEventListeners(): void{
        this.map.addListener('click', (event: any) => this.callbackForMapClickEvent(event));
    }
    placeMarker(lat: number, lon: number): any{
        var infowindow = new google.maps.InfoWindow();
        var geocoder  = new google.maps.Geocoder();
        let destination_marker = this.service.placeMarker(this.map, lat, lon,"default");

        this.markers.push(destination_marker);
        if(this.counter>1){
            geocoder.geocode({
                'latLng': destination_marker.getPosition()
            }, (result:any, status:any) =>{
                if (status == google.maps.GeocoderStatus.OK) {
                    var content = '<div class="cityBike"><div class="title"><h3>Destination</h3><img id="destination_marker" src="img/directionIcon.png" alt="show direction icon" class="functionIcon" style="margin-right:10px;"><br><span>'+result[0].formatted_address+'</span><br>';
                    infowindow.setContent(content);
                    infowindow.open(this.map, destination_marker);
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
                var el = document.getElementById('destination_marker');
                google.maps.event.addDomListener(el,'click',()=>{
                    infowindow.close();
                    this.showDirection(destination_marker);
                });
            });
        }
        return destination_marker;
    }

    private callbackForMapClickEvent(event: any): void{
        if(this.router.url == "/parkandride"){
            this.counter++;
            this.clearMarkers();
            this.clearDirection();
            let clickCoord:Coords = new Coords(event.latLng.lat(),event.latLng.lng());
            this.oldLat = event.latLng.lat();
            this.oldLong = event.latLng.lng();
            var tempMarker = this.placeMarker(event.latLng.lat(),event.latLng.lng());
            if(this.counter<2){
                this.clickUpdated.emit(clickCoord);
                this.clearCircles();
                if(this.circleRadius != 0){
                    this.circles.push(this.service.placeCircle(this.map,this.circleRadius,this.centerLat,this.centerLon));
                }
                if (localStorage_hasData) {
                    this.parkMarker = this.placeParkPlace();
                }
            }
            this.oldRadius = this.circleRadius;
        }else {
            this.counter=0;
        }
    }

    private showDirection(marker: any = null, multiDirection:boolean = true){
        this.that = this;
        var current = new google.maps.LatLng(this.centerLat,this.centerLon);
        var parkCar:any ;
        var chosenMarker:any;
        var min:number;
        var destination = marker.getPosition();

        if(multiDirection){
            if (!localStorage_hasData) {
                this.facilitymarkers.forEach((item, index) => {
                    var temp = google.maps.geometry.spherical.computeDistanceBetween(item.getPosition(), current);
                    if(index==0 || min>temp){
                        min = temp;
                        chosenMarker = item;
                    }
                });
                new google.maps.event.trigger( chosenMarker, 'click' );
                document.getElementById('saveButton').click();
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

            parkCar = chosenMarker.getPosition();
            this.clearDirection();
            document.getElementById('direction').innerHTML='';
            this.service.directionsService(this.map, current, parkCar, this.directionArray,'car',google.maps.DirectionsTravelMode.DRIVING);
            this.service.directionsService(this.map, parkCar, destination, this.directionArray,'public',google.maps.DirectionsTravelMode.TRANSIT);
            this.service.directionsService(this.map, current, destination, this.directionArray,'car',google.maps.DirectionsTravelMode.DRIVING,true);
        }else {
            this.clearDirection();
            document.getElementById('direction').innerHTML='';
            this.service.directionsService(this.map, current, destination, this.directionArray,'car',google.maps.DirectionsTravelMode.DRIVING,true);
        }
    }
}