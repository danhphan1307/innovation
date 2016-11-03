import { Component, OnInit, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';

import {Marker} from '../marker/marker';
import {MarkerComponent} from '../marker/marker.component'
import {MapService} from '../map/map.service'
import {ParkingZoneFilterService} from '../shared/parking-zone-filter.service'
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from '../map/map.component';
import {PricingZoneEnum,ColorCode, ActiveComponent} from '../models/model-enum'
import {ParkingType} from '../models/parking-type';

@Component({
  selector: 'park-zone',
  template:``,
  providers: [MapService,ParkingZoneFilterService]
})

export class ParkZoneComponent implements OnInit {

  parkZones : ParkingType[];
  freeZones: ParkingType[];
  data : string;
  markers : Marker[] = [];

  @Output()
  triggered = new EventEmitter<ActiveComponent>();

  constructor(private mapService: MapService,
    private parkingFilterService: ParkingZoneFilterService){

  }

  ngOnInit(){
    this.triggered.emit(ActiveComponent.PAIDZONE)
  }

  ngOnChanges(){

  }


  public loadZones(pricingZone: PricingZoneEnum, map: MapComponent): void {
    this.parkingFilterService.getParkingZone().subscribe((res: ParkingType[]) => {
      this.parkZones = res;

      this.parkZones = res.filter(f => f.properties.sallittu_pysakointitapa == pricingZone)

    var colorCode = "";

    switch (pricingZone){
      case PricingZoneEnum.PAID_1:
      colorCode= ColorCode.DoRucRo;
      break;
      case PricingZoneEnum.PAID_2:
      colorCode= ColorCode.MauNuocBien;
      break;
      case PricingZoneEnum.PAID_3:
      colorCode= ColorCode.TimQuyPhai;
      break;
      case PricingZoneEnum.PAID_4:
      colorCode= ColorCode.HongSenSua;
      break;
      case PricingZoneEnum.PAID_5:
      colorCode= ColorCode.MauDeoGiKhongBiet
      break;
      case PricingZoneEnum.FREE_1:
      colorCode= ColorCode.XanhMatDiu;
      break;
      case PricingZoneEnum.FREE_2:
      colorCode= ColorCode.CamLoeLoet;
      break;

    }

    for (var z of this.parkZones) {

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