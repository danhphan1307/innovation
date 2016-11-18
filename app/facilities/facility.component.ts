import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FacilityService} from './facility.service';
import {Facility} from './facility';
import {Coords} from '../models/location';
import {Usage, FacilityStatus, ActiveComponent} from '../models/model-enum';
import {MapComponent} from '../map/map.component';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'facility-component',
  template: ``,
  providers: [FacilityService]
})

export class FacilityComponent implements OnInit {

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

  loadAllFacilities(mapComponent: MapComponent, _func?:()=>void){
    this.facilityService.getAllFacilities().subscribe((facilities) => {
      //filter park and ride + active
      this.facilities = facilities.filter(f => f.usages.indexOf(Usage.PARK_AND_RIDE) != -1
        && f.status == FacilityStatus.IN_OPERATION
        );
      mapComponent.placeMarkerFacility(this.facilities, true, true);
      if(_func){
        _func();        
      }
    });
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
