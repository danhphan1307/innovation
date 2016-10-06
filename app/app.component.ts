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

  import {AgmCoreModule} from 'angular2-google-maps/core';
  import {AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
  import {NgModel} from '@angular/forms';

  @Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [BikeService]
  })

  export class AppComponent implements OnInit {
    private leftNavState = 'close';
    private bottomNavState = 'close';
    private blackOverlayState = 'close';


    @ViewChild(LeftNavigation)
    private leftNav:LeftNavigation;

    @ViewChild(BottomNavigation)
    private bottomNav:BottomNavigation;

    @ViewChild(BlackOverlay)
    private blackOverlay: BlackOverlay;

    stations : BikeStation[];
    title = 'City bikes';
    data : string

    // google maps zoom level
    zoom: number = 14;

  // initial center position for the map
  lat: number = 60.1699;
  lon: number = 24.9384;
  iconUrl = '../img/largeBike.png';


  constructor(private bikeService: BikeService){

  }

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

}
