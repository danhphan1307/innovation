import { Component, OnInit } from '@angular/core';

import {FacilityService} from './facility.service';
import { Facility } from './facility';

import {Coords} from '../models/location';

import {MapComponent} from '../map/map.component';
import {AgmCoreModule} from 'angular2-google-maps/core';


@Component({
  selector: 'my-facility',
  template: `<map-gg  (centerUpdated)="receiveCenterUpdated($event)" (clickUpdated)="receivedClick($event)"></map-gg>`,
  providers: [FacilityService],

})

export class FacilityComponent implements OnInit {
  facilities : Facility[];
  center: Coords = new Coords(0.0,0.0);
  mapClicked: Coords = new Coords(0.0,0.0);
  constructor(private facilityService: FacilityService){

  }

  ngOnInit(){
    this.loadFacilitiesNearby();

  }

  receiveCenterUpdated(event: any){
    this.center.lat = event.lat;
    this.center.lon = event.lon;

    this.loadFacilitiesNearby();

  }

  receivedClick(event: any){
    console.log("ffrom fuckility",event);
  }

  private loadFacilitiesNearby(): void{
      this.facilityService.getFaclitiesNearby(this.center,1000)
      .subscribe((facilities) => {
           this.facilities = facilities;

      });

    }

  }
