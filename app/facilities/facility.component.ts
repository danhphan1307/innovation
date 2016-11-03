import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import {FacilityService} from './facility.service';
import { Facility } from './facility';

import {Coords} from '../models/location';


import {LeftNavigation} from '../component/left.navigation.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Usage, PricingMethod, FacilityStatus, ActiveComponent} from '../models/model-enum';
import {MapComponent} from '../map/map.component';

@Component({
  moduleId: module.id,
  selector: 'facility-component',
  template: ``,
  providers: [FacilityService]
})

export class FacilityComponent implements OnInit {

  @ViewChild(LeftNavigation)
  private leftNav:LeftNavigation;

  @Output()
  triggered = new EventEmitter<ActiveComponent>();

  facilities : Facility[];
  center: Coords = new Coords(0.0,0.0);
  mapClicked: Coords = new Coords(0.0,0.0);
  markers : Coords[] = [];
  title = 'Park and Ride';

  map:any;
  coords:any;
  radius:any;
  oldRadius:any;

  constructor(private facilityService: FacilityService){

  }

  ngOnInit(){
    this.triggered.emit(ActiveComponent.PARKING)

  }

  receiveCenterUpdated(event: any){
    this.center.lat = event.lat;
    this.center.lon = event.lon;
  }

  receivedClick(mapComponent:MapComponent, event: Coords, radius:number):void{
    this.map = mapComponent;
    this.coords = event;
    this.radius =radius;
    this.oldRadius = this.radius;
    this.loadFacilitiesNearby(mapComponent, event, radius)
  }

  updateRadius(event:any){
    this.radius = event;
    if (this.coords == null ) {
    }else {
      if(this.oldRadius == null){}
        else{
          if(this.oldRadius!=event){
            this.map.clearMarkers();
            this.radius = event;
            this.oldRadius = this.radius;
            this.loadFacilitiesNearby(this.map, this.coords, this.radius);
          }

        }

      }
    }

    private loadFacilitiesNearby(mapComponent: MapComponent, coord: Coords, radius:number): void{
      this.facilityService.getFaclitiesNearby(coord,radius)
      .subscribe((facilities) => {
        //filter park and ride + active
        this.facilities = facilities.filter(f => f.usages.indexOf(Usage.PARK_AND_RIDE) != -1
          && f.status == FacilityStatus.IN_OPERATION
          );
        mapComponent.placeMarkerFacility(this.facilities);
      });
    }
  }
