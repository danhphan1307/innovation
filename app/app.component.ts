import { Component, OnInit,  Input, Output, trigger, state, style, transition, animate, ViewChild, ElementRef, Renderer, ViewContainerRef, EventEmitter} from '@angular/core';
import {BikeService } from './bikes/bike.service';
import {BikeStation} from './bikes/bike';
import {MapComponent} from './map/map.component';
import {BottomNavigation} from './component/bottom.navigation.component';
import {BlackOverlay} from './component/blackoverlay.component';
import {FacilityComponent} from './facilities/facility.component';
import {Help} from './component/help.component';
import {FilterPanel} from './component/filter.panel';
import {UserComponent} from './component/user.panel.component';
import {BikeComponent} from './bikes/bike.component';
import {ParkZoneComponent} from './park-zone/parkzone.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import {NgModel} from '@angular/forms';
import {Coords} from './models/location';
import { CarouselComponent } from './component/instruction.component';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {PricingZoneEnum} from './models/model-enum';

declare var google: any;
declare var Slider: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: []
})

export class AppComponent implements OnInit {
  options = ['parking', 'parkandride' ,'bike', 'user'];
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

  @ViewChild(ParkZoneComponent)
  private ZoneComponent: ParkZoneComponent;

  @ViewChild(FilterPanel)
  private FilterPanel: FilterPanel;

  @ViewChild(CarouselComponent)
  private carouselComponent: CarouselComponent;

  stations : BikeStation[];
  data : string
  // google maps zoom level
  zoom: number = 14;

  // initial center position for the map
  lat: number = 60.1712179;
  long: number = 24.9418765;

  ngOnInit(){
    this.blackOverlay.setState('full');
    this.FilterPanel.load(this.MapComponent,this.FacilityComponent, this.ZoneComponent);
    this.UserComponent.loadElement(this.carouselComponent);
  }

  constructor(private _router: Router, viewContainerRef:ViewContainerRef ) {
    this.router = _router;
    this.viewContainerRef = viewContainerRef;
    window.addEventListener('online', () => {this.onlineOffline = true});
    window.addEventListener('offline', () => {this.onlineOffline = false});
  }

  /**
   * [Close all]
   */
   public closeAll():void{
     this.blackOverlay.setState('close');
     this.UserComponent.setState('close');
   }

  /**
   * [Called when map is fully loaded]
   * @param {boolean} event [description]
   */
   public loadData(event:boolean){
     if (event==true){
       this.bMapDone = true;
       this.bottomtNav();
     }
   }


  /**
   * [setButtonOnOff prevent unwanted problems. For example, users click the nav bar too fast, the data did not finish loading]
   * @param {any}    _element [description]
   * @param {string} _status  [description]
   */
   setButtonOnOff(_element:any, _status:string){
     for (var i = 0; i< _element.length; i++){
       (<HTMLInputElement>document.getElementById(_element[i])).style.pointerEvents = _status;
     }
   }

 /**
  * [Handling the click activities. This function will only execute after
  *   the map finishes loading. There are callback functions because I want to lock
  *   the navbar and only unlock it when the data is shown on the Map.
  *   For example, after click /bike, user continuously click to parkandride.
  *   The execute order now is reset-> bike->parkandride since the /bike must be fetched with data from HTTP request.]
  */
  public bottomtNav(){
    if(this.bMapDone){
      if(this.router.url == '/user' ){
        this.blackOverlay.setState('open');
        this.UserComponent.setState('open');
      }else {
        this.setButtonOnOff(this.options,'none');
        this.reset();
        if(this.router.url == "/parkandride"){
          this.FilterPanel.SetSliderState(true);
          this.MapComponent.center(this.MapComponent.centerLat, this.MapComponent.centerLon, ():void =>{
            this.setButtonOnOff(this.options,'auto');
          });
        }
        else if(this.router.url == "/parking"){
          this.MapComponent.clickMainMarker();
          this.MapComponent.center(this.MapComponent.centerLat, this.MapComponent.centerLon, ():void =>{
            this.setButtonOnOff(this.options,'auto');
          });
        }
        else if(this.router.url == "/bike"){
          this.displayBikes();
          this.MapComponent.center(this.lat,this.long,():void =>{
            this.setButtonOnOff(this.options,'auto');
          });
        }
      }
    }
  }


  /**
   * [Display bike markers]
   */
   displayBikes(){
     this.FilterPanel.SetSliderState(false);
     this.BikeComponent.loadBikeStations(this.MapComponent);
   }


 /**
  * [Function for displaying small guide panel in bottom left .
  *   From this panel user will be able to open the map
  *   from Apple Map or Google Map depends on their choice.]
  */
  openHelper(){
    if(this.router.url == "/parking"){
      this.FilterPanel.OpenPanel("HRI");
    }else if(this.router.url == "/parkandride"){
      this.FilterPanel.OpenPanel("Facility");
    } else {
      this.FilterPanel.OpenPanel("None");
    }
  }

  closeHelper(event:boolean){
    if(event)
      this.FilterPanel.OpenPanel("Close");
  }

  /**
   * [reset reset everything]
   */
   reset(){
     document.getElementById('help').style.display="none";
     this.MapComponent.closeInfowindow();
     this.blackOverlay.setState('close');
     this.UserComponent.setState('close');
     this.MapComponent.clearFacilityMarkers(true,true);
     this.MapComponent.clearCircles();
     this.MapComponent.clearMarkers();
     this.MapComponent.clearPolygons();
     this.MapComponent.clearDirection();
     this.MapComponent.clearKML();
     this.FilterPanel.closeAllPanel();
   }
 }