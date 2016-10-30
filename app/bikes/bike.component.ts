import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';

import { BikeService } from './bike.service';
import {BikeStation} from './bike';
import {Marker} from '../marker/marker';
import {MarkerComponent} from '../marker/marker.component'
import {MapService} from '../map/map.service'
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from '../map/map.component';

import {ParkingType} from '../models/parking-type';
@Component({
  selector: 'my-bike',
  template:``,
  providers: [BikeService, MapService]
})

export class BikeComponent implements OnInit {
  stations : BikeStation[];
  zones : ParkingType[];

  data : string;
  title = 'Bike Station';
  markers : Marker[] = [];
  iconUrl = 'https://c8.staticflickr.com/6/5298/29373396503_72f744d420_t.jpg';

  @ViewChild(MarkerComponent)
  markerComponent: MarkerComponent
  constructor(private bikeService: BikeService, private mapService: MapService){

  }

  ngOnInit(){

  }

  ngOnChanges(){
    console.log("change in bike");
  }


  public loadBikeStations(mapComponent: MapComponent): void{
    /*this.bikeService.getBikeStations()
    .subscribe((stations:BikeStation[]) => {
      this.stations = stations;
      for (let s of stations){
        mapComponent.placeMarker(s.y,s.x);
      }
    });
*/

this.bikeService.getDataFromFile().subscribe((res: ParkingType[]) => {
  this.zones = res;
      //filter park and ride + active
      this.zones = res.filter(f => f.properties.type == "paid");
      for (var z of this.zones) {
        console.log(z.properties);
      }

    });


}

}