import { Component, OnInit,  Input, Output, trigger, state, style, transition, animate, ViewChild, ElementRef, Renderer, ViewContainerRef, EventEmitter} from '@angular/core';
import {BikeService } from './bikes/bike.service';
import {BikeStation} from './bikes/bike';
import {MapComponent} from './map/map.component';
import {BottomNavigation} from './component/bottom.navigation.component';
import {BlackOverlay} from './component/blackoverlay.component';
import {FacilityComponent} from './facilities/facility.component';
import {Help} from './component/help.component';
import {SearchBar} from './component/search.bar.component';
import {FilterPanel} from './component/filter.panel';
import {UserComponent} from './component/user.panel.component';
import {BikeComponent} from './bikes/bike.component';
import {ParkZoneComponent} from './park-zone/parkzone.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {NgModel} from '@angular/forms';
import {Coords} from './models/location';

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {PricingZoneEnum, ActiveComponent} from './models/model-enum';

declare var google: any;
declare var Slider: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: []
})

export class AppComponent implements OnInit {
  options = ['Zone','Free', 'Unlimited Time' ,'Max 4h Parking', 'Max 1h Parking', 'Parking Facilities'];
  private viewContainerRef: ViewContainerRef;
  public onlineOffline: boolean = navigator.onLine;
  router:Router;
  bMapDone:boolean = false;

  @ViewChild(MapComponent)
  private MapComponent:MapComponent;

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

  @ViewChild(FilterPanel)
  private FilterPanel: FilterPanel;

  stations : BikeStation[];
  data : string

  active : ActiveComponent
  // google maps zoom level
  zoom: number = 14;

  // initial center position for the map
  lat: number = 60.1712179;
  long: number = 24.9418765;

  ngOnInit(){
    this.FilterPanel.load(this.MapComponent,this.FacilityComponent, this.ZoneComponent);
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
    this.blackOverlay.setState('close');
    this.UserComponent.setState('close');
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
        this.FilterPanel.OpenPanel("Facility");
        this.MapComponent.center();
      }else if(this.router.url == "/parking"){
        this.MapComponent.center();
      }
      else {
        if(this.router.url == "/bike"){
          this.displayBikes()
        }
        if (this.router.url == "/hri"){
          this.FilterPanel.OpenPanel("HRI");
        }
        this.MapComponent.center(this.lat,this.long);
      }
    }
  }

  /* Methods for displaying markers*/
  displayBikes(){
    this.FilterPanel.SetliderState(false);
    this.BikeComponent.loadBikeStations(this.MapComponent);
    this.MapComponent.markers = this.BikeComponent.markers;

  }

  openHelper(){
    if(this.router.url == "/hri"){
      this.FilterPanel.OpenPanel("HRI");
    }else if(this.router.url == "/parkandride"){
      this.FilterPanel.OpenPanel("Facility");
    } else {
      this.FilterPanel.OpenPanel("None");
    }
  }
  
  reset(){
    document.getElementById('help').style.display="none";
    document.getElementById('direction').style.display="none";
    this.FilterPanel.closeAllPanel();
    this.MapComponent.clearFacilityMarkers(true,true);
    this.MapComponent.clearCircles();
    this.MapComponent.clearMarkers();
    this.MapComponent.clearPolygons();
    this.MapComponent.clearDirection();
    this.MapComponent.clearKML();
  }

  //Set active component
  setStatus(event: ActiveComponent){
    this.active = event
  }
}