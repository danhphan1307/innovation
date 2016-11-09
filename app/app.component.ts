import { Component, OnInit,  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  ViewChild, ElementRef, Renderer} from '@angular/core';

  import {BikeService } from './bikes/bike.service';
  import {BikeStation} from './bikes/bike';
  import {LeftNavigation} from './component/left.navigation.component';
  import {MapComponent} from './map/map.component';
  import {BottomNavigation} from './component/bottom.navigation.component';
  import {BlackOverlay} from './component/blackoverlay.component';
  import {FacilityComponent} from './facilities/facility.component';
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
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: []
  })

  export class AppComponent implements OnInit {
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

    constructor(private _router: Router) {
      this.router = _router;
      window.addEventListener('online', () => {this.onlineOffline = true});
      window.addEventListener('offline', () => {this.onlineOffline = false});
    }

    public beginLeftNav():void{
      this.leftNav.setState('open');
      this.blackOverlay.setState('open');
    }

    public closeAll():void{
      this.leftNav.setState('close');
      this.blackOverlay.setState('close');
      this.UserComponent.setState('close');
    }

    public FacilityRoute(event:any):void{
      if(this.router.url == "/parking"){
        this.FacilityComponent.receivedClick(this.MapComponent, event, this.leftNav.ReturnSliderValue());
        this.MapComponent.markers = this.FacilityComponent.markers;
      }
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
        this.MapComponent.clearFacilityMarkers();
        document.getElementById('direction').style.display="none";
        this.MapComponent.clearCircles();
        this.MapComponent.clearMarkers();
        this.MapComponent.clearPolygons();
        this.MapComponent.clearDirection();
        this.MapComponent.clearKML();

        if(this.router.url == "/parking"){
          this.leftNav.SetliderState(true);
          this.displayParking();
          this.MapComponent.center();
        }else {
          this.leftNav.SetliderState(false);
          if(this.router.url == "/bike"){
            this.displayBikes()
          }
          if (this.router.url == "/paidzone"){
            this.displayPaidZone()
          }
          if (this.router.url == "/freezone"){
            this.displayFreeZone()
          }
          if (this.router.url == "/layer"){
            this.displayLayer()
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

    //Parking
    displayParking(){
      this.MapComponent.counter=0;
      this.MapComponent.clearDirection();
      var mev={latLng: new google.maps.LatLng(this.MapComponent.centerLat, this.MapComponent.centerLon)};
      google.maps.event.trigger(this.MapComponent.map, 'click', mev);
      this.leftNav.SetliderState(true);
      this.MapComponent.markers = this.FacilityComponent.markers;

    }

    //Layer for freezone
    displayFreeZone(){
      this.ZoneComponent.loadZones(PricingZoneEnum.FREE_1,this.MapComponent);
      this.ZoneComponent.loadZones(PricingZoneEnum.FREE_2,this.MapComponent);
    }

    //Layer for paid zones
    displayPaidZone(){
      this.ZoneComponent.loadZones(PricingZoneEnum.PAID_1,this.MapComponent);
      this.ZoneComponent.loadZones(PricingZoneEnum.PAID_2,this.MapComponent);
      this.ZoneComponent.loadZones(PricingZoneEnum.PAID_3,this.MapComponent);
      this.ZoneComponent.loadZones(PricingZoneEnum.PAID_4,this.MapComponent);
      this.ZoneComponent.loadZones(PricingZoneEnum.PAID_5,this.MapComponent);
    }

    //Layer for parking area
    displayLayer(){
      this.MapComponent.displayKML();
    }
    //Set active component
    setStatus(event: ActiveComponent){
      this.active = event
    }
  }