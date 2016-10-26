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

  import {AgmCoreModule} from 'angular2-google-maps/core';
  import {AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
  import {NgModel} from '@angular/forms';
  import {Coords} from './models/location';

  @Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: []
  })

  export class AppComponent implements OnInit {
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
    this.bottomNav.setState('close');
  }

  public bottomtNav():void{
    this.leftNav.setState('close');
    this.blackOverlay.setState('open');
    this.bottomNav.setState('open');
  }

  public closeAll():void{
    this.leftNav.setState('close');
    this.blackOverlay.setState('close');
    this.bottomNav.setState('close');
  }

  public FacilityRoute(event:any):void{
    this.MapComponent.circleRadius = this.leftNav.ReturnSliderValue();
    this.FacilityComponent.receivedClick(this.MapComponent,this.test, this.leftNav.ReturnSliderValue());//this.MapComponent.clickUpdated
    this.FacilityComponent.receiveCenterUpdated(this.test);//this.MapComponent.centerUpdated
    this.MapComponent.markers = this.FacilityComponent.markers;
    console.log(this.FacilityComponent.markers);
  }
}
