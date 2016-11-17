import { Component, OnInit,  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  ViewChild, ElementRef, Renderer, ViewContainerRef} from '@angular/core';

  import {BikeService } from './bikes/bike.service';
  import {BikeStation} from './bikes/bike';
  import {LeftNavigation} from './component/left.navigation.component';
  import {MapComponent} from './map/map.component';
  import {BottomNavigation} from './component/bottom.navigation.component';
  import {BlackOverlay} from './component/blackoverlay.component';
  import {FacilityComponent} from './facilities/facility.component';
  import {Help} from './component/help.component';
  import {SearchBar} from './component/search.bar.component';
  import {UserComponent} from './component/user.panel.component';
  import {BikeComponent} from './bikes/bike.component';
  import {ParkZoneComponent} from './park-zone/parkzone.component'
  import {AgmCoreModule} from 'angular2-google-maps/core';
  import {AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
  import {NgModel} from '@angular/forms';
  import {Coords} from './models/location';

  import {Injectable} from '@angular/core';
  import {Router} from '@angular/router';
  import {PricingZoneEnum, ActiveComponent} from './models/model-enum';

  declare var google: any;
  @Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: []
  })

  export class AppComponent implements OnInit {
    options = ['Zone','Free', 'Unlimited Time' ,'Max 4h Parking', 'Max 1h Parking', 'Parking Facilities'];
    optionsFacility= ['Show All'];
    private viewContainerRef: ViewContainerRef;
    public onlineOffline: boolean = navigator.onLine;
    router:Router;
    bMapDone:boolean = false;

    @ViewChild(MapComponent)
    private MapComponent:MapComponent;

    @ViewChild(LeftNavigation)
    private leftNav:LeftNavigation;

    @ViewChild(BottomNavigation)
    private bottomNav:BottomNavigation;

    @ViewChild(BlackOverlay)
    private blackOverlay: BlackOverlay;

    @ViewChild(FacilityComponent)
    private FacilityComponent: FacilityComponent;

    @ViewChild(BikeComponent)
    private BikeComponent: BikeComponent;

    @ViewChild(UserComponent)
    private UserComponent: UserComponent;

    @ViewChild(SearchBar)
    private SearchBar: SearchBar;

    @ViewChild(ParkZoneComponent)
    private ZoneComponent: ParkZoneComponent;

    stations : BikeStation[];
    data : string

    active : ActiveComponent
    // google maps zoom level
    zoom: number = 14;

    // initial center position for the map
    lat: number = 60.1712179;
    long: number = 24.9418765;

    ngOnInit(){
      document.getElementById('testImg').addEventListener('click',()=>{
        this.blackOverlay.setState('open');
        this.UserComponent.setState('open');
      })
    }

    constructor(private _router: Router, viewContainerRef:ViewContainerRef ) {
      this.router = _router;
      this.viewContainerRef = viewContainerRef;
      window.addEventListener('online', () => {this.onlineOffline = true});
      window.addEventListener('offline', () => {this.onlineOffline = false});
    }

    public closeAll():void{
      this.leftNav.setState('close');
      this.blackOverlay.setState('close');
      this.UserComponent.setState('close');
    }

    public beginLeftNav():void{
      this.leftNav.setState('open');
      this.blackOverlay.setState('open');
    }

    public loadData(event:boolean){
      //call only if map is completely loaded. receive boolean true
      if (event==true){
        this.bMapDone = true;
        this.bottomtNav();
      }
    }

    public bottomtNav():void{
      if(this.bMapDone == true){
        this.reset();
        if(this.router.url == "/parkandride"){
          document.getElementById('filterFacility').style.display="block";
          this.leftNav.SetliderState(true);
          this.displayParking();
          this.MapComponent.center();
        }else if(this.router.url == "/parking"){
          this.MapComponent.center();
        }
        else {
          if(this.router.url == "/bike"){
            this.displayBikes()
          }
          if (this.router.url == "/hri"){
            document.getElementById('filter').style.display="block";
          }
          this.MapComponent.center(this.lat,this.long);
        } 
      }     
    }

    /* Methods for displaying markers*/
    //Display markers for bikes
    displayBikes(){
      this.leftNav.SetliderState(false);
      this.BikeComponent.loadBikeStations(this.MapComponent);
      this.MapComponent.markers = this.BikeComponent.markers;

    }
    //Display markers for park and ride
    displayParking(){
      this.MapComponent.clearDirection();
      var mev={latLng: new google.maps.LatLng(this.MapComponent.centerLat, this.MapComponent.centerLon)};
      google.maps.event.trigger(this.MapComponent.map, 'click', mev);
      this.leftNav.SetliderState(true);
      this.MapComponent.markers = this.FacilityComponent.markers;
    }

    //Display markers for parking
    displayZone(e:any){
      if(e.target.checked){
        switch (e.target.name) {
          case 'Zone':
          this.MapComponent.displayKML();
          break;
          case "Free":
          this.ZoneComponent.loadZones(PricingZoneEnum.FREE_1,this.MapComponent);
          this.ZoneComponent.loadZones(PricingZoneEnum.FREE_2,this.MapComponent);
          break;
          
          case "Max 4h Parking":
          this.ZoneComponent.loadZones(PricingZoneEnum.PAID_5,this.MapComponent);
          break;

          case "Unlimited Time":
          this.ZoneComponent.loadZones(PricingZoneEnum.PAID_3,this.MapComponent);
          break;

          case "Max 1h Parking":
          this.ZoneComponent.loadZones(PricingZoneEnum.PAID_2,this.MapComponent);
          break;

          case "Parking Facilities":
          this.ZoneComponent.loadZones(PricingZoneEnum.PAID_1,this.MapComponent);
          this.ZoneComponent.loadZones(PricingZoneEnum.PAID_4,this.MapComponent);
          break;
        }

      }else{
        switch (e.target.name) {
          case 'Zone':
          this.MapComponent.clearKML();
          break;
          case "Free":
          this.MapComponent.clearPolygonIndex(0);
          break;
          
          case "Max 4h Parking":
          this.MapComponent.clearPolygonIndex(1);
          break;

          case "Unlimited Time":
          this.MapComponent.clearPolygonIndex(2);
          break;

          case "Max 1h Parking":
          this.MapComponent.clearPolygonIndex(3);
          break;

          case "Parking Facilities":
          this.MapComponent.clearPolygonIndex(4);
          break;
        }
      }
    }
    displayAllFacility(e:any){
      if(e.target.checked){
        switch (e.target.name) {
          case 'Show All':
          this.FacilityComponent.loadAllFacilities(this.MapComponent);
          break;
        }

      }else{
        switch (e.target.name) {
          case 'Show All':
          this.MapComponent.clearFacilityMarkers(false);
          break;
        }
      }
    }

    reset(){
      for (var i = 0; i< this.options.length; i++){
        (<HTMLInputElement>document.getElementById(this.options[i])).checked = false;
      }
      document.getElementById('help').style.display="none";
      document.getElementById('direction').style.display="none";
      document.getElementById('filter').style.display="none";
      document.getElementById('filterFacility').style.display="none";
      this.MapComponent.clearFacilityMarkers(true);
      this.MapComponent.clearCircles();
      this.MapComponent.clearMarkers();
      this.MapComponent.clearPolygons();
      this.MapComponent.clearDirection();
      this.MapComponent.clearKML();
      this.leftNav.SetliderState(false);
    }
    //Set active component
    setStatus(event: ActiveComponent){
      this.active = event
    }
  }