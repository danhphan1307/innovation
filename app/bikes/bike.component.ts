import { Component, OnInit, OnChanges, ViewChild , Output, EventEmitter} from '@angular/core';

import { BikeService } from './bike.service';
import {BikeStation} from './bike';
import {Marker} from '../marker/marker';
import {MarkerComponent} from '../marker/marker.component'
import {MapService} from '../map/map.service'
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from '../map/map.component';
import {ActiveComponent} from '../models/model-enum';

@Component({
  selector: 'my-bike',
  template:``,
  providers: [BikeService, MapService]
})

export class BikeComponent implements OnInit {
  stations : BikeStation[];

  data : string;
  title = 'Bike Station';
  markers : Marker[] = [];

  @ViewChild(MarkerComponent)
  markerComponent: MarkerComponent

  @Output()
  triggered = new EventEmitter<ActiveComponent>();

  constructor(private bikeService: BikeService,
    private mapService: MapService){

  }

  ngOnInit(){

    this.triggered.emit(ActiveComponent.BIKE)
  }

  ngOnChanges(){
    console.log("change in bike");
  }


  public loadBikeStations(mapComponent: MapComponent): void{

    this.bikeService.getBikeStations()
    .subscribe((stations:BikeStation[]) => {
      this.stations = stations;
      mapComponent.placeMarkerBicycle(stations);
    });


  }

}