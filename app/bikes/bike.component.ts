import {Component} from '@angular/core';

import {BikeService } from './bike.service';
import {BikeStation} from './bike';
import {MapService} from '../map/map.service'
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'my-bike',
  template:``,
  providers: [BikeService, MapService]
})

export class BikeComponent{
  stations : BikeStation[];
  data : string;
  title = 'Bike Station';

  constructor(private bikeService: BikeService, private mapService: MapService){
  }

  /**
   * [loadBikeStations description]
   * @param {MapComponent} mapComponent [description]
   */
  public loadBikeStations(mapComponent: MapComponent): void{
    this.bikeService.getBikeStations()
    .subscribe((stations:BikeStation[]) => {
      this.stations = stations;
      mapComponent.placeMarkerBicycle(stations);
    });
  }
}