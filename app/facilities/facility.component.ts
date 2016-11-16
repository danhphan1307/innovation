import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import {FacilityService} from './facility.service';
import { Facility } from './facility';

import {Coords} from '../models/location';


import {LeftNavigation} from '../component/left.navigation.component';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {Usage, PricingMethod, FacilityStatus, ActiveComponent} from '../models/model-enum';
import {MapComponent} from '../map/map.component';

@Component({
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
  markers : Coords[] = [];
  title = 'Park and Ride';

  radius:number;

  constructor(private facilityService: FacilityService){

  }

  ngOnInit(){
    this.triggered.emit(ActiveComponent.PARKING)

  }

  updateRadius(event:number, _map:any){
    this.radius = event;
    _map.clearMarkers();
    this.loadFacilitiesNearby(_map, new Coords(_map.centerLat, _map.centerLon), this.radius);
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
