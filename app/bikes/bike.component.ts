import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';

import { BikeService } from './bike.service';
import {BikeStation, BikeMarker} from './bike';
import {Marker} from '../marker/marker';
import {MarkerComponent} from '../marker/marker.component'
import {MapService} from '../map/map.service'
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'my-bike',
  template:`<marker-gg></marker-gg>`,
  providers: [BikeService, MapService]
})

export class BikeComponent implements OnInit {
  stations : BikeStation[];
  data : string
  markers : Marker[] = []
  iconUrl = 'https://c8.staticflickr.com/6/5298/29373396503_72f744d420_t.jpg';

  @ViewChild(MarkerComponent)
  markerComponent: MarkerComponent
  constructor(private bikeService: BikeService, private mapService: MapService){

  }

  ngOnInit(){
    this.loadBikeStations();
  }

  ngOnChanges(){
    console.log("change in bike")

  }


  private loadBikeStations(): void{
    this.bikeService.getBikeStations()
    .subscribe((stations:BikeStation[]) => {
      this.stations = stations;
      for (let s of stations){
        this.markers.push(this.mapService.placeMarkers(s.y,s.x));
      }
    });

  }

}