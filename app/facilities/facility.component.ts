import { Component, OnInit, ViewChild } from '@angular/core';

import {FacilityService} from './facility.service';
import { Facility } from './facility';

import {Coords} from '../models/location';


import {LeftNavigation} from '../component/left.navigation.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Usage, PricingMethod, FacilityStatus} from '../models/model-enum';
import {MapComponent} from '../map/map.component';

@Component({
  moduleId: module.id,
  selector: 'facility-component',
  template: ``,
  providers: [FacilityService],

})

export class FacilityComponent implements OnInit {

  @ViewChild(LeftNavigation)
  private leftNav:LeftNavigation;

  facilities : Facility[];
  center: Coords = new Coords(0.0,0.0);
  mapClicked: Coords = new Coords(0.0,0.0);
  markers : Coords[] = [];
  title = 'Park and Ride';
  radius = 1000;


  constructor(private facilityService: FacilityService){

  }

  ngOnInit(){
  }

  receiveCenterUpdated(event: any){
    this.center.lat = event.lat;
    this.center.lon = event.lon;

  }

  receivedClick(mapComponent:MapComponent, event: Coords, radius:number):void{
    console.log(event);
    this.loadFacilitiesNearby(mapComponent, event, radius)
  }

  private loadFacilitiesNearby(mapComponent: MapComponent, coord: Coords, radius:number): void{
    this.facilityService.getFaclitiesNearby(coord,radius)
    .subscribe((facilities) => {
      //filter park and ride + active
      this.facilities = facilities.filter(f => f.usages.indexOf(Usage.PARK_AND_RIDE) != -1
        && f.status == FacilityStatus.IN_OPERATION
        );
      for (var f of this.facilities) {
        let coords = f.location.coordinates;
        mapComponent.placeMarker(coords[0][0][1],coords[0][0][0]);
      }
    });
  }
}
