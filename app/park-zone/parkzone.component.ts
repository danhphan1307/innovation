import { Component, OnInit, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import {MapService} from '../map/map.service'
import {ParkingZoneFilterService} from '../shared/parking-zone-filter.service'
import {AgmCoreModule} from 'angular2-google-maps/core';
import {MapComponent} from '../map/map.component';
import {PricingZoneEnum,ColorCode, ActiveComponent} from '../models/model-enum'
import {Coords} from '../models/location'
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

  //Temporary coordinators
  staticLatLon = [[60.1731,24.9484],[60.1708,24.9397],[60.1736, 24.9386],[60.1747,24.9351],[60.1695, 24.9371],
  [60.1682,24.9404],[60.1682,24.9495],[60.1655 , 24.9496],[60.1646,24.9438],[60.1702,24.9305],
  [60.1709 , 24.9330],[60.1730 , 24.9295],[60.1781 , 24.9483],[60.1642, 24.9174],[60.1641 ,24.9100]
  ];
  coords : Coords[] = [];
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

  public loadZones(pricingZone: PricingZoneEnum, map: MapComponent, _func?:()=>void){
    this.parkingFilterService.getParkingZone().subscribe((res: ParkingType[]) => {
      this.parkZones = res;

      this.parkZones = res.filter(f => f.properties.sallittu_pysakointitapa == pricingZone)

      var colorCode = "";
      var indexAbcd = 0;

      switch (pricingZone){
        case PricingZoneEnum.FREE_1:
        colorCode= ColorCode.XanhMatDiu;
        indexAbcd= 0;
        break;
        case PricingZoneEnum.FREE_2:
        colorCode= ColorCode.CamLoeLoet;
        indexAbcd = 0;
        break;
        case PricingZoneEnum.PAID_5:
        colorCode= ColorCode.MauDeoGiKhongBiet
        indexAbcd=1;
        break;
        case PricingZoneEnum.PAID_3:
        colorCode= ColorCode.TimQuyPhai;
        indexAbcd = 2;
        break;
        case PricingZoneEnum.PAID_2:
        colorCode= ColorCode.MauNuocBien;
        indexAbcd = 3;
        break;
        case PricingZoneEnum.PAID_4:
        colorCode= ColorCode.HongSenSua;
        indexAbcd=4;
        break;
        case PricingZoneEnum.PAID_1:
        colorCode= ColorCode.DoRucRo;
        indexAbcd = 4;
        break;
      }
      for (var z of this.parkZones) {
        if (z.geometry.type == "Polygon"){
          //Draw the outbounds
          map.placePolygon(z.geometry.coordinates[0],colorCode, z.properties.sallittu_pysakointitapa, indexAbcd);
        } else if (z.geometry.type == "GeometryCollection"){
          //Draw the Parking sign
          var path1 = z.geometry.geometries[0].coordinates;
          var path2 = z.geometry.geometries[1].coordinates;

          map.placePolygon(path1[0],colorCode, z.properties.sallittu_pysakointitapa, indexAbcd);
          map.placePolygon(path1[1],colorCode, z.properties.sallittu_pysakointitapa, indexAbcd);
          map.placePolygon(path2[0],colorCode, z.properties.sallittu_pysakointitapa, indexAbcd);
          map.placePolygon(path2[1],colorCode, z.properties.sallittu_pysakointitapa, indexAbcd);
        }

      }
      if(_func){
        _func();        
      }
    });
  }

  public putEntrances(map: MapComponent){
    for (var i =  0 ; i <  this.staticLatLon.length ; i++){
      var val = this.staticLatLon[i];
      this.coords.push(new Coords(val[0],val[1]));
    }
    map.placeMarkerEntrance(this.coords);
  }
}