import { Component, OnInit, ViewChild } from '@angular/core';

import {FacilityService} from './facility.service';
import { Facility } from './facility';

import {Coords} from '../models/location';

import {MapComponent} from '../map/map.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Usage, PricingMethod, FacilityStatus} from '../models/model-enum';

@Component({
  moduleId: module.id,
  template: `
  <map-gg     [circleRadius] = "radius"
  [markers] = "markers"
  (centerUpdated)="receiveCenterUpdated($event)"
  (clickUpdated)="receivedClick($event)">
  </map-gg>`,
  providers: [FacilityService],

})

export class FacilityComponent implements OnInit {
  facilities : Facility[];
  center: Coords = new Coords(0.0,0.0);
  mapClicked: Coords = new Coords(0.0,0.0);
  markers : Coords[] = [];
  title = 'Park and Ride';
  radius: number = 1000;

  @ViewChild(MapComponent)
  private mapComponent : MapComponent;

  constructor(private facilityService: FacilityService){

  }

  ngOnInit(){


  }

  receiveCenterUpdated(event: any){
    this.center.lat = event.lat;
    this.center.lon = event.lon;

  }

  receivedClick(event: Coords){
    this.loadFacilitiesNearby(event)
  }

  private loadFacilitiesNearby(coord: Coords): void{
    this.facilityService.getFaclitiesNearby(coord,this.radius)
    .subscribe((facilities) => {
      //filter park and ride + active
      this.facilities = facilities.filter(f => f.usages.indexOf(Usage.PARK_AND_RIDE) != -1
        && f.status == FacilityStatus.IN_OPERATION
        );
      for (var f of this.facilities) {
        console.log(f);
        let coords = f.location.coordinates;
        this.mapComponent.placeMarker(coords[0][0][1],coords[0][0][0]);

      }
    });
  }


}
