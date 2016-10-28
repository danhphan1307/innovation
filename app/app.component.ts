import { Component, OnInit,  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  ViewChild} from '@angular/core';

  import {BikeService } from './bikes/bike.service';
  import {BikeStation} from './bikes/bike';
  import {LeftNavigation} from './component/left.navigation.component';
  import {MapComponent} from './map/map.component';
  import {BottomNavigation} from './component/bottom.navigation.component';
  import {BlackOverlay} from './component/blackoverlay.component';
  import {FacilityComponent} from './facilities/facility.component';
  import {BikeComponent} from './bikes/bike.component';

  import {AgmCoreModule} from 'angular2-google-maps/core';
  import {AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
  import {NgModel} from '@angular/forms';
  import {Coords} from './models/location';

  import {Injectable} from '@angular/core';
  import {Router} from '@angular/router';

  @Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: []
  })

  export class AppComponent implements OnInit {
    router:Router;
    private leftNavState = 'close';
    private bottomNavState = 'close';
    private blackOverlayState = 'close';
    test:Coords = new Coords(60.2224675,24.7912243);

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

    stations : BikeStation[];
    data : string

    // google maps zoom level
    zoom: number = 14;

  // initial center position for the map
  lat: number = 60.1699;
  lon: number = 24.9384;
  iconUrl = '../img/largeBike.png';


  ngOnInit(){

  }


  public beginLeftNav():void{
    this.leftNav.setState('open');
    this.blackOverlay.setState('open');
    //this.bottomNav.setState('close');
  }

  public bottomtNav():void{
    //this.leftNav.setState('close');
    //this.blackOverlay.setState('open');
    //this.bottomNav.setState('open');
    this.MapComponent.clearMap();
    if(this.router.url == "/bike"){
      this.leftNav.SetliderValue(0);
      this.MapComponent.circleRadius = this.leftNav.ReturnSliderValue();
      this.BikeComponent.loadBikeStations(this.MapComponent);
      this.MapComponent.markers = this.BikeComponent.markers;
    }
    if(this.router.url == "/parking"){
      this.leftNav.SetliderValue(1000);
      this.MapComponent.circleRadius = this.leftNav.ReturnSliderValue();
      this.FacilityComponent.receivedClick(this.MapComponent,this.test, this.leftNav.ReturnSliderValue());//this.MapComponent.clickUpdated
      this.FacilityComponent.receiveCenterUpdated(this.test);//this.MapComponent.centerUpdated
      this.MapComponent.markers = this.FacilityComponent.markers;
    }
  }

  public closeAll():void{
    this.leftNav.setState('close');
    this.blackOverlay.setState('close');
    //this.bottomNav.setState('close');
  }
  constructor(private _router: Router ) {
    this.router = _router;
  }

  public FacilityRoute(event:any):void{

    if(this.router.url == "/parking"){
      this.MapComponent.circleRadius = this.leftNav.ReturnSliderValue();
      this.FacilityComponent.receivedClick(this.MapComponent,event, this.leftNav.ReturnSliderValue());
      //this.FacilityComponent.receiveCenterUpdated(this.test);
      this.MapComponent.markers = this.FacilityComponent.markers;
    }
  }
}
