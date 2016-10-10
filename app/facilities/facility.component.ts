import { Component, OnInit, ViewChild } from '@angular/core';

import {FacilityService} from './facility.service';
import { Facility } from './facility';

import {Coords} from '../models/location';

import {MapComponent} from '../map/map.component';
import {AgmCoreModule} from 'angular2-google-maps/core';


@Component({
  selector: 'my-facility',
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
      this.facilities = facilities;
      for (var f of this.facilities) {
        let coords = f.location.coordinates;
        this.mapComponent.placeMarker(coords[0][0][1],coords[0][0][0]);
        //this.markers.push(this.createMarker(new google.maps.LatLng(coords[0][0][1],coords[0][0][0])));
      }
    });
  }


}
