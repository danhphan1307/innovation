import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';

import { BikeService } from './bike.service';
import {BikeStation} from './bike';
import {Marker} from '../marker/marker';
import {MarkerComponent} from '../marker/marker.component'
import {MapService} from '../map/map.service'
import {ParkingZoneFilterService} from '../shared/parking-zone-filter.service'
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from '../map/map.component';
import {PricingZone} from '../models/model-enum'
import {ParkingType} from '../models/parking-type';
@Component({
  selector: 'my-bike',
  template:``,
  providers: [BikeService, MapService,ParkingZoneFilterService]
})

export class BikeComponent implements OnInit {
  stations : BikeStation[];
  paidZones : ParkingType[];
  freeZones: ParkingType[];
  data : string;
  title = 'Bike Station';
  markers : Marker[] = [];
  iconUrl = 'https://c8.staticflickr.com/6/5298/29373396503_72f744d420_t.jpg';

  @ViewChild(MarkerComponent)
  markerComponent: MarkerComponent
  constructor(private bikeService: BikeService,
    private mapService: MapService,
    private parkingFilterService: ParkingZoneFilterService){

  }

  ngOnInit(){

  }

  ngOnChanges(){
    console.log("change in bike");
  }


  public loadBikeStations(mapComponent: MapComponent): void{
    var pricingEnum = PricingZone
    this.bikeService.getBikeStations()
    .subscribe((stations:BikeStation[]) => {
      this.stations = stations;
      mapComponent.placeMarkerBicycle(stations);
    });

    this.getPaidZones(pricingEnum.PAID_1);

  }

  public getPaidZones(pricingZone: PricingZone): void {
    this.bikeService.getDataFromFile().subscribe((res: ParkingType[]) => {
      this.paidZones = res;
      //filter park and ride + active
      this.paidZones = res.filter(f => f.properties.sallittu_pysakointitapa == pricingZone);
      for (var z of this.paidZones) {
        console.log(z.properties);
      }

    });
  }

}