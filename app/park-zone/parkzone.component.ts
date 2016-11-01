import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';

import {Marker} from '../marker/marker';
import {MarkerComponent} from '../marker/marker.component'
import {MapService} from '../map/map.service'
import {ParkingZoneFilterService} from '../shared/parking-zone-filter.service'
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from '../map/map.component';
import {PricingZoneEnum} from '../models/model-enum'
import {ParkingType} from '../models/parking-type';

@Component({
  selector: 'park-zone',
  template:``,
  providers: [MapService,ParkingZoneFilterService]
})

export class ParkZoneComponent implements OnInit {

  paidZones : ParkingType[];
  freeZones: ParkingType[];
  data : string;
  markers : Marker[] = [];


  @ViewChild(MarkerComponent)
  markerComponent: MarkerComponent

  constructor(private mapService: MapService,
    private parkingFilterService: ParkingZoneFilterService){

  }

  ngOnInit(){

  }

  ngOnChanges(){

  }


  public loadZones(pricingZone: PricingZoneEnum, map: MapComponent): void {
    this.parkingFilterService.getParkingZone().subscribe((res: ParkingType[]) => {
      this.paidZones = res;
      //filter park and ride + active
      this.paidZones = res.filter(f => f.properties.sallittu_pysakointitapa == pricingZone)
                                      // && f.geometry.type=="Polygon");
    var colorCode = "";
      if (pricingZone == (PricingZoneEnum.PAID_1 ||PricingZoneEnum.PAID_2||PricingZoneEnum.PAID_3)){
        colorCode='#FF0000'
      } else {
        colorCode = '#0000FF'
      }
      for (var z of this.paidZones) {

      if (z.geometry.type == "Polygon"){
        //Draw the outbounds
        map.placePolygon(z.geometry.coordinates[0],colorCode)
      } else if (z.geometry.type == "GeometryCollection"){
        //Draw the Parking sign
        var path1 = z.geometry.geometries[0].coordinates;
        var path2 = z.geometry.geometries[1].coordinates;

        map.placePolygon(path1[0],colorCode)
        map.placePolygon(path1[1],colorCode)
        map.placePolygon(path2[0],colorCode)
        map.placePolygon(path2[1],colorCode)
      }


      }


    });
      }

}