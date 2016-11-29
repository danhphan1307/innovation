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

/**
 * output event. emit if facility tab is selected
 */
 @Output()
 triggered = new EventEmitter<ActiveComponent>();

/**
 * Array contains scanned facilities
 * @type {Facility[]}
 */
 facilities : Facility[];
  /**
   * Array contains markers on map
   * @type {Coords[]}
   */

   markers : Coords[] = [];
   title = 'Park and Ride';
   /**
    * Radius value in which facilitie service will scan
    * @type {number}
    */
   radius:number;

   constructor(private facilityService: FacilityService){

   }

   ngOnInit(){
     this.triggered.emit(ActiveComponent.PARKING)

   }

  /**
   * Update radius value according to slider value
   * @param {number} event [capture output event from slider]
   * @param {any}    _map  [map object]
   */
   updateRadius(event:number, _map:any){
     this.radius = event;
     _map.clearMarkers();
     this.loadFacilitiesNearby(_map, new Coords(_map.centerLat, _map.centerLon), this.radius);
   }

  /**
   * @class Load all available facilities
   * @method Load fucking value
   * @param {MapComponent} mapComponent [map component]
   * @param {()=>void}     _func        [callback handler]
   */
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

  /**
   * Load all nearby facilities which are within given raidus
   * @param {MapComponent} mapComponent [map component]
   * @param {Coords}       coord        [center coordinate]
   * @param {number}       radius       [radius to scan]
   */
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
